import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  code!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;
}
