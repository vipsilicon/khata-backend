import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// Entity
import { TransactionReference } from 'src/modules/transaction-reference/entities/transaction-reference.entity';

// Enums
import { TransactionType } from 'src/common/enums/transaction-type.enums';

@Entity()
export class BankTransaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  referenceId!: string;

  @ManyToOne(() => TransactionReference, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'referenceId',
    referencedColumnName: 'referenceId',
  })
  transactionReference!: TransactionReference;

  @Column()
  userId!: number;

  @Column()
  authId!: number;

  @Column({ type: 'enum', enum: TransactionType, nullable: false })
  transactionType!: TransactionType;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  amount!: number;

  @Column({ type: 'datetime' })
  transactionDateTime!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
