import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationModule } from '../authentication/authentication.module';
import { RenewJwtMiddleware } from '../authentication/middleware/renew-jwt.middleware';
import { HeroController } from './hero.controller';
import { Hero } from './hero.entity';
import { HeroService } from './hero.service';

@Module({
  imports: [AuthenticationModule, TypeOrmModule.forFeature([Hero])],
  controllers: [HeroController],
  providers: [HeroService],
  exports: [HeroService],
})
export class HeroModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewJwtMiddleware).forRoutes(HeroController);
  }
}
