import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Audit } from '../shared/model/audit.model';

export enum HeroClass {
  S = 'S',
  A = 'A',
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
    name: 'hero_class',
  })
  @Index()
  heroClass: string;

  @Column({
    type: 'numeric',
  })
  lat: number;

  @Column({
    type: 'numeric',
  })
  lng: number;

  @Column({
    nullable: true,
  })
  allocated: boolean = false;
}
