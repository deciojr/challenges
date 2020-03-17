import { Audit } from '../shared/model/audit.model';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'secret_question' })
  @Index()
  secretQuestion: string;

  @Column({ name: 'secret_answer' })
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
