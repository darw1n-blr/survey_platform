import { Module } from '@nestjs/common';
import { SurveyResponseController } from './survey-response.controller';
import { SurveyResponseService } from './survey-response.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {SurveyResponse} from "./models/survey-response.model";
import {Answer} from "./models/answer.model";
import {Question} from "./models/question.model";
import {Choice} from "./models/choice.model";
import {Survey} from "../surveys/surveys.model";
import {QuestionService} from "./question.service";
import {UsersService} from "../users/users.service";
import {SurveysService} from "../surveys/surveys.service";
import {ChoiceService} from "./choice.service";
import {AnswerService} from "./answer.service";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:[
    SequelizeModule.forFeature([User, SurveyResponse, Answer, Choice, Question, Survey]), AuthModule, JwtModule
  ],
  controllers: [SurveyResponseController],
  providers: [SurveyResponseService, QuestionService, UsersService, SurveysService, ChoiceService, AnswerService]
})
export class SurveyResponseModule {}
