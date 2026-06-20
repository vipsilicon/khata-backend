import { Injectable } from '@nestjs/common';
import { CreateTransactionReferenceDto } from './dto/create-transaction-reference.dto';
import { UpdateTransactionReferenceDto } from './dto/update-transaction-reference.dto';

@Injectable()
export class TransactionReferenceService {
  create(createTransactionReferenceDto: CreateTransactionReferenceDto) {
    return 'This action adds a new transactionReference';
  }

  findAll() {
    return `This action returns all transactionReference`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionReference`;
  }

  update(id: number, updateTransactionReferenceDto: UpdateTransactionReferenceDto) {
    return `This action updates a #${id} transactionReference`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionReference`;
  }
}
