import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "node:process";
import {ConfigModule} from "@nestjs/config";



@Module({
  imports: [
      ConfigModule.forRoot({
    envFilePath: '.env',
  }),
      forwardRef(()=> UsersModule),
     JwtModule.register({
      secret: process.env.JWT_KEY || '123' ,
      signOptions:{
        expiresIn: '24h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, ],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
