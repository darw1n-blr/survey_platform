import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "node:process";
import {ValidationPipe} from "@nestjs/common";



async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true, forbidUnknownValues: true}));
  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


}

start();
