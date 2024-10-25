import {IsNotEmpty, IsNumber, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateChoiceDto {
    @IsNotEmpty()
    @MaxLength(64)
    @ApiProperty({example: "yes", description: 'text of choice'})
    readonly text: string;
    @IsNumber({}, {message: "QuestionId must be an id of existing question"})
    @ApiProperty({example: "1", description: 'choices question id'})
    readonly questionId: number;
}