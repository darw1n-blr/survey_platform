import {IsNotEmpty, IsNumber, MaxLength} from "class-validator";

export class CreateQuestionDto{
    @IsNotEmpty()
    @MaxLength(64)
    readonly text: string;
    @IsNotEmpty()
    @IsNumber({}, {message: "QuestionId must be an id of existing question"})
    readonly surveyId: number;
}