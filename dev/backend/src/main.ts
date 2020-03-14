import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  let app = await NestFactory.create(AppModule);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
