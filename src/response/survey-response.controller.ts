import {Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards} from '@nestjs/common';
import {QuestionService} from "./question.service";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {CreateChoiceDto} from "./dto/create-choice.dto";
import {ChoiceService} from "./choice.service";
import {AnswerService} from "./answer.service";
import {CreateAnswerDto} from "./dto/create-answer.dto";
import {CreateSurveyResponseDto} from "./dto/create-surveyResponse.dto";
import {SurveyResponseService} from "./survey-response.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {Question} from "./models/question.model";
import {Choice} from "./models/choice.model";
import {Answer} from "./models/answer.model";
import {SurveyResponse} from "./models/survey-response.model";
import {Survey} from "../surveys/surveys.model";

@ApiTags('Questions, Choices, Answers, Responses')
@UseGuards(JwtAuthGuard)
@Controller('response')
export class SurveyResponseController {
    constructor(private questionService: QuestionService,
                private choiceService: ChoiceService,
                private answerService: AnswerService,
                private responseService: SurveyResponseService,
                ) {}

    @ApiOperation({summary: 'Create question'})
    @ApiResponse({status: 201, type: Question})
    @Post('question')
    createQuestion(@Body() dto: CreateQuestionDto){
        const question = this.questionService.createQuestion(dto)
        return question;
    }

    @ApiOperation({summary: 'Create choice'})
    @ApiResponse({status: 201, type: Choice})
    @Post('choice')
    createChoice(@Body() dto: CreateChoiceDto){
        const choice = this.choiceService.createChoice(dto)
        return choice;
    }

    @ApiOperation({summary: 'Add answer'})
    @ApiResponse({status: 201, type: Answer})
    @Post('answer')
    addAnswer(@Body() dto: CreateAnswerDto){
        const answer = this.answerService.createAnswer(dto)
        return answer;
    }

    @ApiOperation({summary: 'Add response'})
    @ApiResponse({status: 201, type: SurveyResponse})
    @Post()
    addResponse(@Body() dto: CreateSurveyResponseDto){
        const answer = this.responseService.addSurveyResponse(dto)
        return answer;
    }

    @ApiOperation({summary: 'Get question choices'})
    @ApiResponse({status: 200, type: [Choice]})
    @Get('choices/:id')
    getChoices(@Param('id', ParseIntPipe) id: number){
        const choices = this.choiceService.getChoicesFromQuestionId(id)
        return choices;
    }

    @ApiOperation({summary: 'Get survey questions'})
    @ApiResponse({status: 200, type: [Question]})
    @Get('questions/:id')
    getQuestions(@Param('id', ParseIntPipe) id: number){
        const questions = this.questionService.getQuestionsFromSurveyId(id)
        return questions;
    }

    @ApiOperation({summary: 'Get response answers'})
    @ApiResponse({status: 200, type: [Answer]})
    @Get('answers/:id')
    getAnswers(@Param('id', ParseIntPipe) id: number){
        const answers = this.answerService.getAnswersFromResponseId(id)
        return answers
    }

    @ApiOperation({summary: 'Get users that took survey'})
    @ApiResponse({status: 200, type: [User]})
    @Get('users/:id')
    getUsersFromSurveyId(@Param('id', ParseIntPipe) id: number){
        const users = this.responseService.getUsersFromSurvey(id)
        return users;
    }

    @ApiOperation({summary: 'Get surveys that user took'})
    @ApiResponse({status: 200, type: [Survey]})
    @Get('surveys/:id')
    getSurveysFromUserId(@Param('id', ParseIntPipe) id: number){
        const surveys = this.responseService.getSurveysFromUser(id)
        return surveys;
    }

    @ApiOperation({summary: 'Get amount of users that took survey'})
    @ApiResponse({status: 200, type: Number})
    @Get('users-amount/:id')
    getUsersAmout(@Param('id', ParseIntPipe) id: number){
        const users = this.responseService.getAmountOfUsersFromSurvey(id)
        return users;
    }


}
