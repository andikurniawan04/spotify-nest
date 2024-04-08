import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import NotFoundExceptionFilter from './core/exceptions/filters/NotFoundException.filter';
import { ValidationPipe } from '@nestjs/common';

require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(3000);
}
bootstrap();
