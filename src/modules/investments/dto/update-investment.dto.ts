import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateInvestmentDto } from './create-investment.dto';

export class UpdateInvestmentDto extends PartialType(CreateInvestmentDto) {}
