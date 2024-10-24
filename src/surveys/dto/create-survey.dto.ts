import {IsNotEmpty, MaxLength} from "class-validator";

export class CreateSurveyDto{
    @IsNotEmpty()
    @MaxLength(32)
    readonly title: string;
    @MaxLength(100)
    readonly description: string;
}