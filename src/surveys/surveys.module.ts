import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {SurveyResponse} from "../response/models/survey-response.model";
import {Question} from "../response/models/question.model";
import {Survey} from "./surveys.model";
import {QuestionService} from "../response/question.service";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {CacheModule} from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import * as process from "node:process";

@Module({
  imports:[
    SequelizeModule.forFeature([Survey ,SurveyResponse, Question]),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      ttl: Number(process.env.REDIS_TTL) ,
    }),
    AuthModule, JwtModule,
  ],
  controllers: [SurveysController],
  providers: [SurveysService, QuestionService],
  exports: [SurveysService],
})
export class SurveysModule {}
