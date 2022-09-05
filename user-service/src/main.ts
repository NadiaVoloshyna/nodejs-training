import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
  ValidationPipe,
  ValidationError,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors.map(
          (error) => `${Object.values(error.constraints).join(', ')}`,
        );
        return new UnprocessableEntityException(message);
      },
      skipMissingProperties: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('This API allows you to manipulate users data')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/swagger-html', app, document);

  await app.listen(process.env.PORT);
  console.info(`Application is running: ${await app.getUrl()}`);
}
bootstrap();
