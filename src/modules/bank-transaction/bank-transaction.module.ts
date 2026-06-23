import { Module } from '@nestjs/common';

// Services
import { BankTransactionService } from './bank-transaction.service';

// Controller
import { BankTransactionController } from './bank-transaction.controller';

@Module({
  controllers: [BankTransactionController],
  providers: [BankTransactionService],
})
export class BankTransactionModule {}
