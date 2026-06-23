import { Module } from '@nestjs/common';

// Services
import { CashTransactionService } from './cash-transaction.service';

// Controllers
import { CashTransactionController } from './cash-transaction.controller';

@Module({
  controllers: [CashTransactionController],
  providers: [CashTransactionService],
})
export class CashTransactionModule {}
