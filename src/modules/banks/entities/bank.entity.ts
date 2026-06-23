import { UserBank } from 'src/user-banks/entities/user-bank.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  code!: string;

  @Column()
  iconUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => UserBank, (userBank) => userBank.bank)
  userBanks!: UserBank[];

  static updateBankData(data: Partial<Bank>, bankData: Bank): Bank {
    Object.assign(bankData, data);

    return bankData;
  }
}
