import { Injectable, Inject } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Survey} from "./surveys.model";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {CreateSurveyDto} from "./dto/create-survey.dto";
import {Question} from "../response/models/question.model";
import {CACHE_MANAGER, Cache} from "@nestjs/cache-manager";

@Injectable()
export class SurveysService {
    constructor(@InjectModel(Survey) private surveyRepository: typeof Survey,
                @InjectModel(Question) private questionRepository: typeof Question,
                @Inject(CACHE_MANAGER) private cacheManager: Cache
                ) {}


    async createSurvey(dto: CreateSurveyDto){
        const survey = await this.surveyRepository.create(dto)
        return survey;
    }

    async getSurvey(id: number){
        const survey = await this.surveyRepository.findByPk(id)
        return survey;
    }

    async getAllSurveys(){
        const surveys = await this.surveyRepository.findAll()
        return surveys;
    }

    async getCachedSurveys(){
        const cachedSurveys = await this.cacheManager.get('surveys')
        if (cachedSurveys) return cachedSurveys

        const surveys = await this.surveyRepository.findAll()
        await this.cacheManager.set('surveys', surveys)
        return surveys

    }

    async updateSurvey(dto: CreateSurveyDto, id: number){
        const survey = await this.surveyRepository.update({
                title: dto.title,
                description: dto.description
            },
            {where: {id: id}}
        )
    }

    async deleteSurvey(id: number){
        const isDeleted = await this.surveyRepository.destroy({where: {id:id}})
        return isDeleted
    }

    async getQuestionsBySurveyId(id:number){
        const questions = await this.questionRepository.findAll({where: {surveyId: id}})
        return questions
    }


}
