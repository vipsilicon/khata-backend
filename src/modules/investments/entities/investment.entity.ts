import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Enums
import { InvestmentType } from 'src/common/enums/investmentType.enums';

// Entity
import { TransactionReference } from 'src/modules/transaction-reference/entities/transaction-reference.entity';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  authId!: number;

  @Column()
  referenceId!: number;

  @ManyToOne(() => TransactionReference, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'referenceId',
    referencedColumnName: 'id',
  })
  transactionReference!: TransactionReference;

  @Column({ type: 'enum', enum: InvestmentType })
  investmentType!: InvestmentType;

  @Column({ length: 255, nullable: false })
  investmentName!: string;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  amount!: number;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  quantity!: number;

  @Column({ type: 'datetime' })
  transactionDateTime!: Date;

  @Column()
  deleted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
