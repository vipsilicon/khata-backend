import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

// Enums
import { UserRole } from 'src/common/enums/userRole.enums';

// Utils
import { PasswordUtils } from 'src/common/utils/passworrd.utils';

// Entity
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column({ nullable: true })
  lastName?: string;

  @Index()
  @Column({ unique: true })
  email!: string;

  @Index()
  @Column({ unique: true })
  mobile!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => Admin, (admin) => admin.auth)
  admin!: Admin;

  @OneToOne(() => User, (user) => user.auth)
  user!: User;

  // Admin
  static async createAdminData(data: Partial<Auth>): Promise<Partial<Auth>> {
    return {
      ...data,
      password: await PasswordUtils.hashPassword(data.password ?? ''),
      role: UserRole.ADMIN,
      isActive: false,
    };
  }

  // User
  static async createUserData(data: Partial<Auth>): Promise<Partial<Auth>> {
    return {
      ...data,
      password: await PasswordUtils.hashPassword(data.password ?? ''),
      role: UserRole.USER,
      isActive: false,
    };
  }

  static async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return PasswordUtils.comparePassword(password, hash);
  }
}
