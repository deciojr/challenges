import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { NestFactory } from '@nestjs/core';
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
async function bootstrap() {
  let app = await NestFactory.create(AppModule);

  app = addToApp(app, new ValidationPipe(), 'pipe', true);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
