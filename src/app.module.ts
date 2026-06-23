import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';
import { BanksModule } from './modules/banks/banks.module';
import { BankTransactionModule } from './modules/bank-transaction/bank-transaction.module';
import { CashTransactionModule } from './modules/cash-transaction/cash-transaction.module';
import { InvestmentsModule } from './modules/investments/investments.module';
import { ProductsModule } from './modules/products/products.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { TransactionReferenceModule } from './modules/transaction-reference/transaction-reference.module';
import { UserBanksModule } from './user-banks/user-banks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Root@12345',
      database: 'khata_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    AdminModule,
    UsersModule,
    BanksModule,
    BankTransactionModule,
    CashTransactionModule,
    InvestmentsModule,
    ProductsModule,
    TransactionsModule,
    TransactionReferenceModule,
    UserBanksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
