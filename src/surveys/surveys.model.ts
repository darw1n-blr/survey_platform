import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {SurveyResponse} from "../response/models/survey-response.model";
import {Question} from "../response/models/question.model";

interface SurveyCreationAttributes{
    title: string;
    description: string;
}

@Table({tableName: 'surveys'})
export class Survey extends Model<Survey, SurveyCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    description: string;

    @HasMany(() => SurveyResponse)
    responses: SurveyResponse[]

    @HasMany(() => Question)
    questions: Question[]


}