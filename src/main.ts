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
  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 204,
    origin: ['http://localhost:5173/', 'http://localhost:5173', 'localhost:5173'],
    preflightContinue: false,
  });  
  app.use(compression());
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
})();
