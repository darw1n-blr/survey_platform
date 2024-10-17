import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Survey} from "../../surveys/surveys.model";
import {SurveyResponse} from "./survey-response.model";
import {Choice} from "./choice.model";
import {Question} from "./question.model";


interface AnswerCreationAttributes{
    questionId: number;
    choiceId: number;
    responseId: number;
}


@Table({tableName: 'answers'})
export class Answer extends Model<Answer, AnswerCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => SurveyResponse)
    @Column({type: DataType.INTEGER})
    responseId: number;

    @BelongsTo(() => SurveyResponse)
    survey: SurveyResponse

    @ForeignKey(() => Choice)
    @Column({type: DataType.INTEGER})
    choiceId: number;

    @BelongsTo(() => Choice)
    choice: Choice

    @ForeignKey(() => Question)
    @Column({type: DataType.INTEGER})
    questionId: number;

    @BelongsTo(() => Question)
    question: Question

}