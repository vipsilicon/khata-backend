import { Test, TestingModule } from '@nestjs/testing';
import { TransactionReferenceController } from './transaction-reference.controller';
import { TransactionReferenceService } from './transaction-reference.service';

describe('TransactionReferenceController', () => {
  let controller: TransactionReferenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionReferenceController],
      providers: [TransactionReferenceService],
    }).compile();

    controller = module.get<TransactionReferenceController>(TransactionReferenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
