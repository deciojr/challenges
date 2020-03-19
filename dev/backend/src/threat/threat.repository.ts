import { EntityRepository, Repository } from 'typeorm';

import { Threat } from './threat.entity';

@EntityRepository(Threat)
export class ThreatRepository extends Repository<Threat> {}
