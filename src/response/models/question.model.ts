import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {Survey} from "../../surveys/surveys.model";
import {Answer} from "./answer.model";
import {Choice} from "./choice.model";
import {ApiProperty} from "@nestjs/swagger";

interface QuestionCreationAttributes{
    text: string;
    surveyId: number;
}


@Table({tableName: 'questions'})
export class Question extends Model<Question, QuestionCreationAttributes> {

    @ApiProperty({example: 'id', description: 'id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Do u have a dog?', description: 'text of question'})
    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ApiProperty({example: '1', description: 'questions survey id'})
    @ForeignKey(() => Survey)
    @Column({type: DataType.INTEGER})
    surveyId: number;

    @BelongsTo(() => Survey)
    survey: Survey

    @HasMany(() => Answer)
    answers: Answer[]

    @HasMany(() => Choice)
    choices: Choice[]





}