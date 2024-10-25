import {IsNotEmpty, IsNumber, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateQuestionDto{
    @IsNotEmpty()
    @MaxLength(64)
    @ApiProperty({example: "Do you have a dog?", description: 'text of question'})
    readonly text: string;
    @IsNotEmpty()
    @IsNumber({}, {message: "QuestionId must be an id of existing question"})
    @ApiProperty({example: "1", description: 'questions survey id'})
    readonly surveyId: number;
}