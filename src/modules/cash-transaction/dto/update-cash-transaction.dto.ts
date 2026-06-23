import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateCashTransactionDto } from './create-cash-transaction.dto';

export class UpdateCashTransactionDto extends PartialType(
  CreateCashTransactionDto,
) {}
