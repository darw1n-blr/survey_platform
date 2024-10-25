import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "node:process";
import {ValidationPipe, Version} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";



async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle("Survey Platform")
      .setDescription("Pet-project Google forms clone")
      .addTag("darw1n-blr")
      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true, forbidUnknownValues: true}));



  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


}

start();
