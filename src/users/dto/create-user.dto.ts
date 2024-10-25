import {IsEmail, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @IsEmail()
    @MaxLength(254)
    @ApiProperty({example: "email@example.com", description: 'email address'})
    readonly email: string;
    @MaxLength(64)
    @MinLength(5)
    @ApiProperty({example: "123asd123", description: 'users password'})
    readonly password: string;
}