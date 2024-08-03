import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import NotFoundExceptionFilter from './core/exceptions/filters/NotFoundException.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NotFoundExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Spotify Clone API Documentation')
    .setDescription('Documentation for Spotify Clone API')
    .setVersion('1.0')
    .addTag('Spotify Clone API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`Application is running on: ${await app.getUrl()}/docs`);
}

bootstrap();
