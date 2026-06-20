import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashTransactionService } from './cash-transaction.service';
import { CreateCashTransactionDto } from './dto/create-cash-transaction.dto';
import { UpdateCashTransactionDto } from './dto/update-cash-transaction.dto';

@Controller('cash-transaction')
export class CashTransactionController {
  constructor(private readonly cashTransactionService: CashTransactionService) {}

  @Post()
  create(@Body() createCashTransactionDto: CreateCashTransactionDto) {
    return this.cashTransactionService.create(createCashTransactionDto);
  }

  @Get()
  findAll() {
    return this.cashTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashTransactionDto: UpdateCashTransactionDto) {
    return this.cashTransactionService.update(+id, updateCashTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashTransactionService.remove(+id);
  }
}
