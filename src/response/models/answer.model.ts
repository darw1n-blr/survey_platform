import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Survey} from "../../surveys/surveys.model";
import {SurveyResponse} from "./survey-response.model";
import {Choice} from "./choice.model";
import {Question} from "./question.model";
import {ApiProperty} from "@nestjs/swagger";


interface AnswerCreationAttributes{
    questionId: number;
    choiceId: number;
    responseId: number;
}


@Table({tableName: 'answers'})
export class Answer extends Model<Answer, AnswerCreationAttributes> {

    @ApiProperty({example: '1', description: 'id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'response foreign key'})
    @ForeignKey(() => SurveyResponse)
    @Column({type: DataType.INTEGER})
    responseId: number;

    @BelongsTo(() => SurveyResponse)
    survey: SurveyResponse

    @ApiProperty({example: '1', description: 'choice foreign key'})
    @ForeignKey(() => Choice)
    @Column({type: DataType.INTEGER})
    choiceId: number;

    @BelongsTo(() => Choice)
    choice: Choice

    @ApiProperty({example: '1', description: 'question foreign key'})
    @ForeignKey(() => Question)
    @Column({type: DataType.INTEGER})
    questionId: number;

    @BelongsTo(() => Question)
    question: Question

}