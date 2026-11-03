import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'node:fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
