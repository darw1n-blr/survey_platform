import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Choice} from "./models/choice.model";
import {CreateChoiceDto} from "./dto/create-choice.dto";
import {Question} from "./models/question.model";

@Injectable()
export class ChoiceService {

    constructor(@InjectModel(Choice) private choiceRepository: typeof Choice,
                @InjectModel(Question) private questionRepository: typeof Question) {}

    async createChoice(dto: CreateChoiceDto){
        const choice = await this.choiceRepository.create(dto)
        return choice;
    }


    async deleteChoice(id: number){
        const isDeleted = await this.choiceRepository.destroy({where: {id:id}})
        if (!isDeleted) return new NotFoundException(`Choice with id ${id} does not exist`)
        return isDeleted
    }

    async getChoicesFromQuestionId(id: number){
        const choices = await this.choiceRepository.findAll({where:{questionId:id}})
        if (!choices) return new NotFoundException(`Choices in question with id ${id} dont exist`)
        return choices;
    }


}
