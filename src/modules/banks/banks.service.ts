import { HttpException, Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
// import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from './entities/bank.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultServerResponse } from 'src/common/constants/default.constants';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(Bank)
    private readonly banksRepository: Repository<Bank>,
  ) {}

  create(createBankDto: CreateBankDto) {
    const response = { ...defaultServerResponse };

    try {
      const bank = this.banksRepository.create(createBankDto);
      response.statusCode = 201;
      response.message = 'Bank created successfully';
      response.body = this.banksRepository.save(bank);
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || 'Login failed';
      } else if (error instanceof Error) {
        response.statusCode = 500;
        response.message = error.message;
      } else {
        response.statusCode = 500;
        response.message = 'Login failed';
      }
    }

    return response;
  }

  // findAll() {
  //   return `This action returns all banks`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} bank`;
  // }

  // update(id: number, updateBankDto: UpdateBankDto) {
  //   return `This action updates a #${id} bank`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bank`;
  // }
}
