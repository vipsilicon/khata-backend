import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JoinColumn } from 'typeorm';

// Entity
import { Bank } from 'src/modules/banks/entities/bank.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateUserBankDto } from '../dto/create-user-bank.dto';

@Entity()
export class UserBank {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0.0,
  })
  intialAmount!: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0.0,
  })
  balance!: number;

  @Column()
  userId!: number;

  @Column()
  bankId!: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Bank, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bankId' })
  bank!: Bank;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  static createUserBankData(data: CreateUserBankDto, userId: number) {
    return {
      ...data,
      userId,
      balance: data?.initialAmount ?? 0,
    };
  }
}
