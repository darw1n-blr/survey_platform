import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateAnswerDto {
    @IsNumber({}, {message: "QuestionId must be an id of existing question"})
    @ApiProperty({example: "1", description: 'answers question id'})
    readonly questionId: number;
    @IsNumber({}, {message: "ChoiceId must be an id of existing choice"})
    @ApiProperty({example: "1", description: 'answers choice id'})
    readonly choiceId: number;
    @IsNumber({}, {message: "ResponseId must be an id of existing SurveyResponse"})
    @ApiProperty({example: "1", description: 'answers response id'})
    readonly responseId: number;
}