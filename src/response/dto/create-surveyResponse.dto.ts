import {IsNumber} from "class-validator";

export class CreateSurveyResponseDto {
    @IsNumber({}, {message: "SurveyId must be an id of existing survey"})
    readonly surveyId: number;
    @IsNumber({}, {message: "UserId must be an id of existing user"})
    readonly userId: number;
}