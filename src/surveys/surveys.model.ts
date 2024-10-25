import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {SurveyResponse} from "../response/models/survey-response.model";
import {Question} from "../response/models/question.model";
import {ApiProperty} from "@nestjs/swagger";

interface SurveyCreationAttributes{
    title: string;
    description: string;
}

@Table({tableName: 'surveys'})
export class Survey extends Model<Survey, SurveyCreationAttributes> {

    @ApiProperty({example: '1', description: 'id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Your opinion about dogs', description: 'Title of survey'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'In this survey you can answers questions about dogs', description: 'Description of survey'})
    @Column({type: DataType.STRING})
    description: string;

    @HasMany(() => SurveyResponse)
    responses: SurveyResponse[]

    @HasMany(() => Question)
    questions: Question[]


}