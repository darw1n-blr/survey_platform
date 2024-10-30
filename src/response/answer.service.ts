import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Question} from "./models/question.model";
import {Answer} from "./models/answer.model";
import {CreateAnswerDto} from "./dto/create-answer.dto";

@Injectable()
export class AnswerService {

    constructor(@InjectModel(Answer) private answerRepository: typeof Answer,
                @InjectModel(Question) private questionRepository: typeof Question) {}

    async createAnswer(dto: CreateAnswerDto){
        const answer = await this.answerRepository.create(dto)
        return answer;
    }


    async deleteAnswer(id: number){
        const isDeleted = await this.answerRepository.destroy({where: {id:id}})
        if (!isDeleted) return new NotFoundException(`Answer with id ${id} does not exist`)
        return isDeleted
    }

    async getAnswersFromResponseId(id: number){
        const answers = await this.answerRepository.findAll({where:{responseId:id}})
        if (!answers) return new NotFoundException(`Answers in response with id ${id} not found`)
        return answers;
    }


}
