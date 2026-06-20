import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class TransactionReference {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'uuid',
    unique: true,
    generated: 'uuid',
  })
  referenceId!: string;

  @Column()
  deleted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
