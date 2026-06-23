import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { UserBanksService } from './user-banks.service';

// Controllers
import { UserBanksController } from './user-banks.controller';

// Entity
import { UserBank } from './entities/user-bank.entity';

// Modules
import { UsersModule } from 'src/modules/users/users.module';
import { BanksModule } from 'src/modules/banks/banks.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserBank]), UsersModule, BanksModule],
  controllers: [UserBanksController],
  providers: [UserBanksService],
})
export class UserBanksModule {}
