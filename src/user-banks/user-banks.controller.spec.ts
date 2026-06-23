import { Test, TestingModule } from '@nestjs/testing';
import { UserBanksController } from './user-banks.controller';
import { UserBanksService } from './user-banks.service';

describe('UserBanksController', () => {
  let controller: UserBanksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBanksController],
      providers: [UserBanksService],
    }).compile();

    controller = module.get<UserBanksController>(UserBanksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
