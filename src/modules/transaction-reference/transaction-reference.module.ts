import { Module } from '@nestjs/common';

// Services
import { TransactionReferenceService } from './transaction-reference.service';

// Controllers
import { TransactionReferenceController } from './transaction-reference.controller';

@Module({
  controllers: [TransactionReferenceController],
  providers: [TransactionReferenceService],
})
export class TransactionReferenceModule {}
