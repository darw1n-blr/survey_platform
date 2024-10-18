import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {SurveyResponse} from "../response/models/survey-response.model";
import {Question} from "../response/models/question.model";
import {Survey} from "./surveys.model";
import {QuestionService} from "../response/question.service";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:[
    SequelizeModule.forFeature([Survey ,SurveyResponse, Question]), AuthModule, JwtModule
  ],
  controllers: [SurveysController],
  providers: [SurveysService, QuestionService]
})
export class SurveysModule {}
