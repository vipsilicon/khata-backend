import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateTransactionReferenceDto } from './create-transaction-reference.dto';

export class UpdateTransactionReferenceDto extends PartialType(
  CreateTransactionReferenceDto,
) {}
