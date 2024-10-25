import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateSurveyResponseDto {
    @IsNumber({}, {message: "SurveyId must be an id of existing survey"})
    @ApiProperty({example: "1", description: 'responses survey id'})
    readonly surveyId: number;
    @IsNumber({}, {message: "UserId must be an id of existing user"})
    @ApiProperty({example: "1", description: 'responses user id'})
    readonly userId: number;
}