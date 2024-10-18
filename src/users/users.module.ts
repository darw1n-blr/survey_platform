import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {SurveyResponse} from "../response/models/survey-response.model";
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports:[
    SequelizeModule.forFeature([User, SurveyResponse]), JwtModule, forwardRef(()=> AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
      UsersService,
  ]
})
export class UsersModule {}
