import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import NotFoundExceptionFilter from './core/exceptions/filters/NotFoundException.filter';

require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(3000);
}
bootstrap();
