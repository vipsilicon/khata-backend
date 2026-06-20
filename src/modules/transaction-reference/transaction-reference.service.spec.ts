import { Test, TestingModule } from '@nestjs/testing';
import { TransactionReferenceService } from './transaction-reference.service';

describe('TransactionReferenceService', () => {
  let service: TransactionReferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionReferenceService],
    }).compile();

    service = module.get<TransactionReferenceService>(TransactionReferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
