import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {SurveyResponse} from "./models/survey-response.model";
import {User} from "../users/user.model";
import {Op} from "sequelize";
import {Survey} from "../surveys/surveys.model";
import {CreateSurveyDto} from "../surveys/dto/create-survey.dto";
import {CreateSurveyResponseDto} from "./dto/create-surveyResponse.dto";

@Injectable()
export class SurveyResponseService {
    constructor(@InjectModel(SurveyResponse) private responseRepository: typeof SurveyResponse,
                @InjectModel(User) private userRepository: typeof User,
                @InjectModel(Survey) private surveyRepository: typeof Survey,
    ) {}


    async addSurveyResponse(dto: CreateSurveyResponseDto){
        const response = await this.responseRepository.create(dto)
        return response;
    }


    async getUsersFromSurvey(id: number){
        const usersIds = await this.responseRepository.findAll({attributes: ['userId'], where: {surveyId: id}})
        if(!usersIds) return new NotFoundException('Users didnt take part in this survey')
        const usersIdsArray = usersIds.map(response => response.userId)

        const users = await this.userRepository.findAll({
            where:{
                id:{
                    [Op.in]: usersIdsArray
                }
            }})

        return users;


    }

    async getAmountOfUsersFromSurvey(id: number){
        const usersIds = await this.responseRepository.findAll({attributes: ['userId'], where: {surveyId: id}})
        if(!usersIds) return new NotFoundException('Users didnt take part in this survey')
        const usersIdsArray = usersIds.map(response => response.userId)
        return usersIdsArray.length;
    }

    async getSurveysFromUser(id:number){
        const surveysIds = await this.responseRepository.findAll({attributes: ['surveyId'], where: {userId: id}})
        if(!surveysIds) return new NotFoundException('Surveys didnt have take part by any user')
        const surveysIdsArray = surveysIds.map(response => response.surveyId)
        console.log(surveysIdsArray)

        const surveys = await this.surveyRepository.findAll({
            where:{
                id:{
                    [Op.in]: surveysIdsArray
                }
            }})

        return surveys;
    }


}
