import {IsNotEmpty, IsNumber, MaxLength} from "class-validator";

export class CreateChoiceDto {
    @IsNotEmpty()
    @MaxLength(64)
    readonly text: string;
    @IsNumber({}, {message: "QuestionId must be an id of existing question"})
    readonly questionId: number;
}