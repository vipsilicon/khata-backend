import { Module } from '@nestjs/common';

// Services
import { ProductsService } from './products.service';

// Controllers
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
