import 'reflect-metadata';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'node:fs';
import { AppModule } from '@/app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const port = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('node-chat API')
    .setDescription('Realtime chat API')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${port}`, 'Local dev')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  writeFileSync('openapi.json', JSON.stringify(document, null, 2));

  await app.listen(port);
  console.log(`🚀 http://localhost:${port}`);
  console.log(`📘 Swagger UI: http://localhost:${port}/docs`);
}
bootstrap();
