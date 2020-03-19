import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationModule } from '../authentication/authentication.module';
import { RenewJwtMiddleware } from '../authentication/middleware/renew-jwt.middleware';
import { HeroModule } from '../hero/hero.module';
import { Threat } from './threat.entity';
import { ThreatService } from './threat.service';
import { ThreatController } from './threat.controller';

@Module({
  imports: [
    AuthenticationModule,
    HeroModule,
    TypeOrmModule.forFeature([Threat]),
  ],
  controllers: [ThreatController],
  providers: [ThreatService],
})
export class ThreatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewJwtMiddleware).forRoutes(ThreatController);
  }
}
