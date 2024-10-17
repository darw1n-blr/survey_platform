import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {QuestionService} from "./question.service";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {CreateChoiceDto} from "./dto/create-choice.dto";
import {ChoiceService} from "./choice.service";
import {AnswerService} from "./answer.service";
import {CreateAnswerDto} from "./dto/create-answer.dto";
import {CreateSurveyResponseDto} from "./dto/create-surveyResponse.dto";
import {SurveyResponseService} from "./survey-response.service";

@Controller('response')
export class SurveyResponseController {
    constructor(private questionService: QuestionService,
                private choiceService: ChoiceService,
                private answerService: AnswerService,
                private responseService: SurveyResponseService,
                ) {}

    @Post('question')
    createQuestion(@Body() dto: CreateQuestionDto){
        const question = this.questionService.createQuestion(dto)
        return question;
    }

    @Post('choice')
    createChoice(@Body() dto: CreateChoiceDto){
        const choice = this.choiceService.createChoice(dto)
        return choice;
    }

    @Post('answer')
    addAnswer(@Body() dto: CreateAnswerDto){
        const answer = this.answerService.createAnswer(dto)
        return answer;
    }

    @Post()
    addResponse(@Body() dto: CreateSurveyResponseDto){
        const answer = this.responseService.addSurveyResponse(dto)
        return answer;
    }

    @Get('choices/:id')
    getChoices(@Param('id') id: number){
        const choices = this.choiceService.getChoicesFromQuestionId(id)
        return choices;
    }

    @Get('questions/:id')
    getQuestions(@Param('id') id: number){
        const questions = this.questionService.getQuestionsFromSurveyId(id)
        return questions;
    }

    @Get('answers/:id')
    getAnswers(@Param('id') id: number){
        const answers = this.answerService.getAnswersFromResponseId(id)
        return answers
    }

    @Get('users/:id')
    getUsersFromSurveyId(@Param('id') id: number){
        const users = this.responseService.getUsersFromSurvey(id)
        return users;
    }

    @Get('surveys/:id')
    getSurveysFromUserId(@Param('id') id: number){
        const surveys = this.responseService.getSurveysFromUser(id)
        return surveys;
    }

    @Get('users-amount/:id')
    getUsersAmout(@Param('id') id: number){
        const users = this.responseService.getAmountOfUsersFromSurvey(id)
        return users;
    }


}
