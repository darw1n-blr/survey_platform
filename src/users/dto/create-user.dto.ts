import {IsEmail, MaxLength, MinLength} from "class-validator";

export class CreateUserDto{
    @IsEmail()
    @MaxLength(254)
    readonly email: string;
    @MaxLength(64)
    @MinLength(5)
    readonly password: string;
}