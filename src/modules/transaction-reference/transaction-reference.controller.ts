import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionReferenceService } from './transaction-reference.service';
import { CreateTransactionReferenceDto } from './dto/create-transaction-reference.dto';
import { UpdateTransactionReferenceDto } from './dto/update-transaction-reference.dto';

@Controller('transaction-reference')
export class TransactionReferenceController {
  constructor(private readonly transactionReferenceService: TransactionReferenceService) {}

  @Post()
  create(@Body() createTransactionReferenceDto: CreateTransactionReferenceDto) {
    return this.transactionReferenceService.create(createTransactionReferenceDto);
  }

  @Get()
  findAll() {
    return this.transactionReferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionReferenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionReferenceDto: UpdateTransactionReferenceDto) {
    return this.transactionReferenceService.update(+id, updateTransactionReferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionReferenceService.remove(+id);
  }
}
