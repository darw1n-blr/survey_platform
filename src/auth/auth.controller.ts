import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }


    @Post('register')
    register(@Body() dto: CreateUserDto){
        const user = this.authService.register(dto)
        return user;
    }

    @Post('login')
    login(@Body() dto: CreateUserDto){
        const user = this.authService.login(dto)
        return user;
    }

}
