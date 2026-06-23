import { Module } from '@nestjs/common';

// Services
import { InvestmentsService } from './investments.service';

// Controllers
import { InvestmentsController } from './investments.controller';

@Module({
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
})
export class InvestmentsModule {}
