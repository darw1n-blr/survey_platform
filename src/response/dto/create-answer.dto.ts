import {IsNumber} from "class-validator";

export class CreateAnswerDto {
    @IsNumber({}, {message: "QuestionId must be an id of existing question"})
    readonly questionId: number;
    @IsNumber({}, {message: "ChoiceId must be an id of existing choice"})
    readonly choiceId: number;
    @IsNumber({}, {message: "ResponseId must be an id of existing SurveyResponse"})
    readonly responseId: number;
}