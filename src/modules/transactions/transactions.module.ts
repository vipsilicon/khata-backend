import { Module } from '@nestjs/common';

// Services
import { TransactionsService } from './transactions.service';

// Controllers
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
