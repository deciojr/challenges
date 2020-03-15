import { Audit } from '../shared/model/audit.model';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User extends Audit {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  @Index()
  secretQuestion: string;

  @Column()
  @Index()
  secretAnswer: string;

  async hashPassword?(password: string) {
    const rounds = 10;
    return await bcrypt.hash(password, rounds);
  }

  async comparePasswords?(password, encryptedPassword) {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
