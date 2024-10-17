import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Question} from "./models/question.model";
import {CreateQuestionDto} from "./dto/create-question.dto";

@Injectable()
export class QuestionService {

    constructor(@InjectModel(Question) private questionRepository: typeof Question) {}

    async createQuestion(dto: CreateQuestionDto){
        const question = await this.questionRepository.create(dto)
        return question;
    }


    async deleteQuestion(id: number){
        const isDeleted = await this.questionRepository.destroy({where: {id:id}})
        return isDeleted
    }

    async getQuestionsFromSurveyId(id: number){
        const questions = await this.questionRepository.findAll({where:{surveyId:id}})
        return questions;
    }


}
