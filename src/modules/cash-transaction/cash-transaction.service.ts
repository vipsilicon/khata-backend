import { Injectable } from '@nestjs/common';
import { CreateCashTransactionDto } from './dto/create-cash-transaction.dto';
import { UpdateCashTransactionDto } from './dto/update-cash-transaction.dto';

@Injectable()
export class CashTransactionService {
  create(createCashTransactionDto: CreateCashTransactionDto) {
    return 'This action adds a new cashTransaction';
  }

  findAll() {
    return `This action returns all cashTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashTransaction`;
  }

  update(id: number, updateCashTransactionDto: UpdateCashTransactionDto) {
    return `This action updates a #${id} cashTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashTransaction`;
  }
}
