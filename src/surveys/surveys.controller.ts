import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {SurveysService} from "./surveys.service";
import {CreateSurveyDto} from "./dto/create-survey.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller('surveys')
export class SurveysController {
    constructor(private surveyService: SurveysService) {}

    @Post()
    createSurvey(@Body() dto: CreateSurveyDto){
        const survey = this.surveyService.createSurvey(dto)
        return survey;
    }

    @Get(':id')
    getSurveyById(@Param('id') id: number){
        const survey = this.surveyService.getSurvey(id)
        return survey;

    }

    @Get()
    getAllSurveys(){
        const surveys = this.surveyService.getCachedSurveys()
        return surveys;
    }

    @Get("test")
    getAllSurveysTest(){
        const surveys = this.surveyService.getAllSurveys()
        return surveys;
    }

    @Get('questions/:id')
    getQuestions(@Param('id') id: number){
        const questions = this.surveyService.getQuestionsBySurveyId(id)
        return questions
    }

    @Put(':id')
    updateSurvey(@Body() dto: CreateSurveyDto,
               @Param('id') id: number){
        const survey = this.surveyService.updateSurvey(dto, id)
        return survey;
    }

    @Delete(':id')
    deleteSurvey(@Param('id') id: number){
        const survey = this.surveyService.deleteSurvey(id)
        return survey;
    }



}
