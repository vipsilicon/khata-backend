import { Module } from '@nestjs/common';
import { TransactionReferenceService } from './transaction-reference.service';
import { TransactionReferenceController } from './transaction-reference.controller';

@Module({
  controllers: [TransactionReferenceController],
  providers: [TransactionReferenceService],
})
export class TransactionReferenceModule {}
