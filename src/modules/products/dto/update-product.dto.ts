import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
