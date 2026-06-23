import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';

// Entity
import { Bank } from './entities/bank.entity';

// Interfaces
import { IBank } from 'src/common/interfaces/banks.interface';

// DTOs
import { CreateBankDto } from './dto/create-bank.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

// Constants
import { BANKS_CONST } from 'src/common/constants/common.constants';
import { defaultServerResponse } from 'src/common/constants/default.constants';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(Bank)
    private readonly banksRepository: Repository<Bank>,
  ) {}

  async create(createBankDto: CreateBankDto) {
    const response = { ...defaultServerResponse };

    try {
      const bank = this.banksRepository.create(createBankDto);
      const createdBank = await this.banksRepository.save(bank);
      const body: IBank = {
        id: createdBank.id,
        name: createdBank.name,
        code: createdBank.code,
        iconUrl: createdBank.iconUrl,
      };
      response.statusCode = HttpStatus.CREATED;
      response.message = BANKS_CONST.SUCCESS.CREATED_BANK;
      response.body = body;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message =
          error.message || BANKS_CONST.ERROR.FAILED_CREATE_BANK;
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = BANKS_CONST.ERROR.FAILED_CREATE_BANK;
      }
    }

    return response;
  }

  async findAll(paginationDto: PaginationDto) {
    const response = { ...defaultServerResponse };
    const { page = 1, limit = 10 } = paginationDto;
    try {
      const [banks, total] = await this.banksRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: {
          name: 'ASC',
        },
      });

      const banksData: IBank[] = banks.map((bank) => {
        return {
          id: bank.id,
          name: bank.name,
          code: bank.code,
          iconUrl: bank.iconUrl,
        };
      });
      response.statusCode = HttpStatus.OK;
      response.message = BANKS_CONST.SUCCESS.FETCHED_BANK_LISTS;
      response.body = {
        data: banksData,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || BANKS_CONST.ERROR.FAILED_BANK_LISTS;
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = BANKS_CONST.ERROR.FAILED_BANK_LISTS;
      }
    }
    return response;
  }

  async update(id: number, updateBankDto: UpdateBankDto) {
    const response = { ...defaultServerResponse };

    try {
      const bank = await this.banksRepository.findOne({ where: { id } });

      if (!bank) {
        throw new NotFoundException(BANKS_CONST.ERROR.BANK_NOT_FOUND);
      }

      const updatedBankData = Bank.updateBankData(updateBankDto, bank);

      const savedBankData = await this.banksRepository.save(updatedBankData);

      const body: IBank = {
        id: savedBankData.id,
        name: savedBankData.name,
        code: savedBankData.code,
        iconUrl: savedBankData.iconUrl,
      };

      response.statusCode = HttpStatus.CREATED;
      response.message = BANKS_CONST.SUCCESS.UPDATED_BANK;
      response.body = body;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message;
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = BANKS_CONST.ERROR.FAILED_UPDATE_BANK;
      }
    }

    return response;
  }

  async isBankExist(id: number): Promise<boolean> {
    const bank = await this.banksRepository.findOne({ where: { id } });

    if (bank) {
      return true;
    }

    return false;
  }
}
