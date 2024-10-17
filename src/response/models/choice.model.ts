import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {Survey} from "../../surveys/surveys.model";
import {Question} from "./question.model";
import {Answer} from "./answer.model";

interface ChoiceCreationAttributes{
    text: string;
    questionId: number;
}


@Table({tableName: 'choices'})
export class Choice extends Model<Choice, ChoiceCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ForeignKey(() => Question)
    @Column({type: DataType.INTEGER})
    questionId: number;

    @BelongsTo(() => Question)
    question: Question

    @HasMany(() => Answer)
    answers: Answer[]


}