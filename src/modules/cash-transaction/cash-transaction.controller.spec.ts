import { Test, TestingModule } from '@nestjs/testing';
import { CashTransactionController } from './cash-transaction.controller';
import { CashTransactionService } from './cash-transaction.service';

describe('CashTransactionController', () => {
  let controller: CashTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashTransactionController],
      providers: [CashTransactionService],
    }).compile();

    controller = module.get<CashTransactionController>(CashTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
