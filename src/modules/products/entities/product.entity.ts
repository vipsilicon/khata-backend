import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm/browser';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  authId!: number;

  @Column()
  productName!: string;

  @Column()
  companyName!: string;
}
