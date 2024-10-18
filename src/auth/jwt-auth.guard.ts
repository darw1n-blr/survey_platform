import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";



@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];

            if (!token) { throw new UnauthorizedException('Unavailable JWT token')}

            const user = this.jwtService.verify(token);
            req.user = user;
            return true;

        }catch(err){
            console.log(err);
            throw new UnauthorizedException('Unauthorized');
        }


    }
}