import {IsNotEmpty, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateSurveyDto{
    @IsNotEmpty()
    @MaxLength(32)
    @ApiProperty({example: "Your opinion about dogs", description: 'Title of survey'})
    readonly title: string;
    @MaxLength(100)
    @ApiProperty({example: "In this survey you can answers questions about dogs", description: 'Description of survey'})
    readonly description: string;
}