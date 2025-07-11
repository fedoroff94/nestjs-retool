// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that are not in the DTO
      forbidNonWhitelisted: true, // throws an error if extra properties are sent
      transform: true, // automatically transforms payloads to DTO instances
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
