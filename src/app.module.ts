import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { SurveysModule } from './surveys/surveys.module';
import { SurveyResponseModule } from './response/survey-response.module';
import { AuthModule } from './auth/auth.module';
import * as process from "node:process";
import {SurveyResponse} from "./response/models/survey-response.model";
import {Survey} from "./surveys/surveys.model";
import {Answer} from "./response/models/answer.model";
import {Question} from "./response/models/question.model";
import {User} from "./users/user.model";
import {Choice} from "./response/models/choice.model";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
      }),
      SequelizeModule.forRoot({
    dialect: process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres',
        storage: process.env.NODE_ENV === 'test' ? ':memory:' : undefined,
    host: process.env.NODE_ENV === 'test' ? undefined: process.env.POSTGRES_HOST,
    port: process.env.NODE_ENV === 'test' ? undefined: Number(process.env.POSTGRES_PORT),
    username: process.env.NODE_ENV === 'test' ? undefined: process.env.POSTGRES_USER,
    password: process.env.NODE_ENV === 'test' ? undefined: process.env.POSTGRES_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? undefined: process.env.POSTGRES_DB,
    models: [User, SurveyResponse, Survey, Choice, Answer, Question],
    autoLoadModels: true
  })
    , UsersModule, SurveysModule, SurveyResponseModule, AuthModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
