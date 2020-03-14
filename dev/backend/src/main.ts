import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const addToApp = (
  app: INestApplication,
  toUse,
  type: 'pipe' | 'filter' | 'interceptor' | 'guard',
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

  setupSwagger(app);

  app = addToApp(
    app,
    new ValidationPipe({ disableErrorMessages: true }),
    'pipe',
    true,
  );

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
