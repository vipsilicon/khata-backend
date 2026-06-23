import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}
