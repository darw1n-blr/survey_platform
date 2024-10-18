import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "node:process";



async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


}

start();
