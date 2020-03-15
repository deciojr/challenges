import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Audit {
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
