import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Audit } from '../shared/model/audit.model';

export enum HeroClass {
  S = 'S',
  A = ' A',
  B = 'B',
  C = 'C',
}

@Entity({ name: 'heroes' })
export class Hero extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @Index()
  name: string;

  @Column({ unique: true })
  @Index()
  badge: string;

  @Column({
    type: 'enum',
    enum: HeroClass,
  })
  @Index()
  heroClass: string;

  @Column()
  lat: string;

  @Column()
  lng: string;
}
