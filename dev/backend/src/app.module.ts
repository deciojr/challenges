import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HeroModule } from './hero/hero.module';
import { ThreatModule } from './threat/threat.module';

import * as ormConfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AuthenticationModule,
    UserModule,
    HeroModule,
    ThreatModule,
  ],
})
export class AppModule {}
