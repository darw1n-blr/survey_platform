import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import bcrypt = require("bcrypt");
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {


    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}


    private async generateJwt(id: number, email: string){
        const payload = {id, email};
        return await this.jwtService.sign(payload);
    }


    async register(dto: CreateUserDto){
        const candidate = await this.usersService.getUserByEmail(dto.email);
        if(candidate instanceof NotFoundException){
            const hashedPassword = await bcrypt.hash(dto.password, 10)
            const user = await this.usersService.createUser({...dto, password: hashedPassword})
            const token = await this.generateJwt(user.id, user.email)
            return {token, userId: user.id}
      }
        return new BadRequestException(`User with email ${dto.email} already exists`)
    }

    async login(dto: CreateUserDto){
        const user = await this.usersService.getUserByEmail(dto.email);
        if(user instanceof NotFoundException) return new UnauthorizedException('This email is not registered')
        const comparePassword = bcrypt.compareSync(dto.password, user.password)
        if(!comparePassword) return new UnauthorizedException('Wrong password')
        const token = await this.generateJwt(user.id, user.email)
        return {token, userId: user.id};

    }
}
