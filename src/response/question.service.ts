import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Question} from "./models/question.model";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {NotFoundError} from "rxjs";

@Injectable()
export class QuestionService {

    constructor(@InjectModel(Question) private questionRepository: typeof Question) {}

    async createQuestion(dto: CreateQuestionDto){
        const question = await this.questionRepository.create(dto)
        return question;
    }


    async deleteQuestion(id: number){
        const isDeleted = await this.questionRepository.destroy({where: {id:id}})
        if (!isDeleted) return new NotFoundException(`Question with id ${id} not found`)
        return isDeleted
    }

    async getQuestionsFromSurveyId(id: number){
        const questions = await this.questionRepository.findAll({where:{surveyId:id}})
        if(!questions) return new NotFoundException(`Question in survey with id ${id} not found`)
        return questions;
    }


}
