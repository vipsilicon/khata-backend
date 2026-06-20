import { Module } from '@nestjs/common';
import { CashTransactionService } from './cash-transaction.service';
import { CashTransactionController } from './cash-transaction.controller';

@Module({
  controllers: [CashTransactionController],
  providers: [CashTransactionService],
})
export class CashTransactionModule {}
