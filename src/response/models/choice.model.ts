import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {Survey} from "../../surveys/surveys.model";
import {Question} from "./question.model";
import {Answer} from "./answer.model";
import {ApiProperty} from "@nestjs/swagger";

interface ChoiceCreationAttributes{
    text: string;
    questionId: number;
}


@Table({tableName: 'choices'})
export class Choice extends Model<Choice, ChoiceCreationAttributes> {

    @ApiProperty({example: 'id', description: 'id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Yes', description: 'text of choice'})
    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ApiProperty({example: '1', description: 'choices question id'})
    @ForeignKey(() => Question)
    @Column({type: DataType.INTEGER})
    questionId: number;

    @BelongsTo(() => Question)
    question: Question

    @HasMany(() => Answer)
    answers: Answer[]


}