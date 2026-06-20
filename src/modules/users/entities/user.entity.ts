import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Auth } from 'src/modules/auth/entities/auth.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  mobile!: string;

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @Column()
  authId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => Auth)
  @JoinColumn({
    name: 'authId',
    referencedColumnName: 'id',
  })
  auth!: Auth;

  static createUserData(data: Partial<User>): Partial<User> {
    return {
      ...data,
      avatar: data.avatar ?? undefined,
    };
  }
}
