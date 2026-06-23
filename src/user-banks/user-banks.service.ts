import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

// Entity
import { UserBank } from './entities/user-bank.entity';

// Services
import { UsersService } from 'src/modules/users/users.service';
import { BanksService } from 'src/modules/banks/banks.service';

// Interfaces
import { IAuthPayload } from 'src/common/interfaces/auth.interface';
import {
  IUserBanks,
  IUserBankList,
} from 'src/common/interfaces/user-banks.interface';
// DTOs
import { CreateUserBankDto } from './dto/create-user-bank.dto';

// Constants
import { defaultServerResponse } from 'src/common/constants/default.constants';
import { USER_BANK_CONST } from 'src/common/constants/common.constants';

@Injectable()
export class UserBanksService {
  constructor(
    @InjectRepository(UserBank)
    private readonly userBankRepository: Repository<UserBank>,
    private readonly userServices: UsersService,
    private readonly banksService: BanksService,
  ) {}

  async create(createUserBankDto: CreateUserBankDto) {
    const response = { ...defaultServerResponse };

    try {
      const isUserExist = await this.userServices.isUserExist(
        createUserBankDto.userId,
      );

      if (!isUserExist) {
        throw new NotFoundException(USER_BANK_CONST.ERROR.USER_NOT_FOUND);
      }

      const isBankExist = await this.banksService.isBankExist(
        createUserBankDto.bankId,
      );

      if (!isBankExist) {
        throw new NotFoundException(USER_BANK_CONST.ERROR.BANK_NOT_FOUND);
      }

      const userBankExist = await this.userBankRepository.findOne({
        where: {
          userId: createUserBankDto.userId,
          bankId: createUserBankDto.bankId,
        },
      });

      if (userBankExist) {
        throw new ConflictException(
          USER_BANK_CONST.ERROR.USER_BANK_RECORD_EXIST,
        );
      }

      const userBank = this.userBankRepository.create(createUserBankDto);
      const createdUserBank = await this.userBankRepository.save(userBank);

      const body: IUserBanks = {
        id: createdUserBank.id,
        initialAmount: createdUserBank.intialAmount,
        balance: createdUserBank.balance,
        userId: createdUserBank.userId,
        bankId: createdUserBank.bankId,
      };
      response.statusCode = HttpStatus.CREATED;
      response.message = USER_BANK_CONST.SUCCESS.USER_BANK_CREATED;
      response.body = body;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message =
          error.message || USER_BANK_CONST.ERROR.USER_BANK_CREATED_FAILED;
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = USER_BANK_CONST.ERROR.USER_BANK_CREATED_FAILED;
      }
    }

    return response;
  }

  async list(req: Request) {
    const response = { ...defaultServerResponse };
    const typedReq = req as Request & { auth?: IAuthPayload };
    const userId = typedReq.auth?.id ?? 0;

    try {
      const userBanks = await this.userBankRepository.find({
        where: { userId },
        relations: { bank: true },
      });

      if (!userBanks) {
        throw new NotFoundException(
          USER_BANK_CONST.ERROR.USER_BANK_RECORD_NOT_FOUND,
        );
      }

      const body: IUserBankList[] = userBanks.map((userBank) => {
        return {
          id: userBank.id,
          bankId: userBank.bankId,
          bankName: userBank.bank.name,
          bankCode: userBank.bank.code,
          bankIcon: userBank.bank.iconUrl,
          initialAmount: userBank.intialAmount,
          balance: userBank.balance,
          userId: userBank.userId,
        };
      });

      response.statusCode = HttpStatus.OK;
      response.message = USER_BANK_CONST.SUCCESS.USER_BANK_LIST_FETCHED;
      response.body = { data: body, userId };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message =
          error.message || USER_BANK_CONST.ERROR.USER_BANK_FETCHED_FAILED;
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = USER_BANK_CONST.ERROR.USER_BANK_FETCHED_FAILED;
      }
    }

    return response;
  }
}
