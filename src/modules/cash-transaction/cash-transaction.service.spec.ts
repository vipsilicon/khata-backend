import { Test, TestingModule } from '@nestjs/testing';
import { CashTransactionService } from './cash-transaction.service';

describe('CashTransactionService', () => {
  let service: CashTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashTransactionService],
    }).compile();

    service = module.get<CashTransactionService>(CashTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
