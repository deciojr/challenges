import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Audit } from '../shared/model/audit.model';

export enum DangerLevel {
  DRAGON = 'Dragon',
  GOD = 'God',
  WOLF = 'Wolf',
  TIGER = 'Tiger',
}

@Entity({ name: 'threats' })
export class Threat extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'monster_name' })
  monsterName: string;

  @Column({
    type: 'enum',
    enum: DangerLevel,
    name: 'danger_level',
  })
  @Index()
  dangerLevel: DangerLevel;

  @Column({ name: 'hero_name', nullable: true })
  @Index()
  heroName: string;

  @Column({ name: 'hero_id', nullable: true })
  heroId: string;

  @Column({ type: 'numeric' })
  lat: number;

  @Column({ type: 'numeric' })
  lng: number;

  @Column({ nullable: true })
  defeated: boolean;
}
