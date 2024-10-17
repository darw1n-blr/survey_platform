import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {SurveyResponse} from "../response/models/survey-response.model";

@Module({
  imports:[
    SequelizeModule.forFeature([User, SurveyResponse]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
