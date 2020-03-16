import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const addToApp = (
  app: INestApplication,
  toUse,
  type: 'pipe' | 'filter' | 'interceptor' | 'guard' | 'middleware',
  global = false,
) => {
  if (global) {
    const addGlobally = {
      pipe: pipe => app.useGlobalPipes(pipe),
      filter: filter => app.useGlobalFilters(filter),
      interceptor: interceptor => app.useGlobalInterceptors(interceptor),
      guard: guard => app.useGlobalGuards(guard),
    };

    return addGlobally[type](toUse);
  }

  return app.use(toUse);
};

const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('ZRP Dev Challenge - ONU Threats')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  setupSwagger(app);

  app = addToApp(app, new ValidationPipe(), 'pipe', true);

  app = addToApp(app, helmet(), 'middleware');

  Logger.log(`🚀  Listening on port ${process.env.SERVER_PORT}`);

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
