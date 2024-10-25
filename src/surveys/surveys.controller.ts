import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {SurveysService} from "./surveys.service";
import {CreateSurveyDto} from "./dto/create-survey.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {Survey} from "./surveys.model";
import {Question} from "../response/models/question.model";

@ApiTags('Surveys')
@UseGuards(JwtAuthGuard)
@Controller('surveys')
export class SurveysController {
    constructor(private surveyService: SurveysService) {}


    @ApiOperation({summary: 'Create survey'})
    @ApiResponse({status: 201, type: Survey})
    @Post()
    createSurvey(@Body() dto: CreateSurveyDto){
        const survey = this.surveyService.createSurvey(dto)
        return survey;
    }

    @ApiOperation({summary: 'Get survey'})
    @ApiResponse({status: 200, type: Survey})
    @Get(':id')
    getSurveyById(@Param('id') id: number){
        const survey = this.surveyService.getSurvey(id)
        return survey;

    }

    @ApiOperation({summary: 'Get all surveys from cache'})
    @ApiResponse({status: 200, type: [Survey]})
    @Get()
    getAllSurveys(){
        const surveys = this.surveyService.getCachedSurveys()
        return surveys;
    }

    @ApiOperation({summary: 'Get all surveys from DB (cache not included in tests)'})
    @ApiResponse({status: 200, type: [Survey]})
    @Get("test")
    getAllSurveysTest(){
        const surveys = this.surveyService.getAllSurveys()
        return surveys;
    }

    @ApiOperation({summary: 'Get questions from survey'})
    @ApiResponse({status: 200, type: [Question]})
    @Get('questions/:id')
    getQuestions(@Param('id') id: number){
        const questions = this.surveyService.getQuestionsBySurveyId(id)
        return questions
    }

    @ApiOperation({summary: 'Update survey'})
    @ApiResponse({status: 200, type: Survey})
    @Put(':id')
    updateSurvey(@Body() dto: CreateSurveyDto,
               @Param('id') id: number){
        const survey = this.surveyService.updateSurvey(dto, id)
        return survey;
    }

    @ApiOperation({summary: 'Delete survey'})
    @ApiResponse({status: 200, type: Boolean})
    @Delete(':id')
    deleteSurvey(@Param('id') id: number){
        const survey = this.surveyService.deleteSurvey(id)
        return survey;
    }



}
