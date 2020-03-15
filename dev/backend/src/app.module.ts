import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';

import * as ormConfig from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule],
})
export class AppModule {}
