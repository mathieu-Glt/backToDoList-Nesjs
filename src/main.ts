import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); // This sets a global prefix for all routes
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
