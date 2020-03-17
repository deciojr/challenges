import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RenewJwtMiddleware } from './authentication/middleware/renew-jwt.middleware';
import { heroRoutes } from './hero/hero.routes';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HeroModule } from './hero/hero.module';

import * as ormConfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    AuthenticationModule,
    HeroModule,
  ],
})
export class AppModule {}
