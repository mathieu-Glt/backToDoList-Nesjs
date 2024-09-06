import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomResponseInterceptor } from './shared/core/CustomResponseInterceptor';
import * as cookieParser from 'cookie-parser';

(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.useGlobalInterceptors(new CustomResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  // Express
  app.enableCors();
  app.use(compression());
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
})();
