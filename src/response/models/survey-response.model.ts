    import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {User} from "../../users/user.model";
import {Survey} from "../../surveys/surveys.model";
import {Answer} from "./answer.model";


interface SurveyResponseCreationAttributes{
    surveyId: number;
    userId: number;
}



@Table({tableName: 'responses'})
export class SurveyResponse extends Model<SurveyResponse, SurveyResponseCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Survey)
    @Column({type: DataType.INTEGER})
    surveyId: number;

    @BelongsTo(() => Survey)
    survey: Survey

    @HasMany(() => Answer)
    answers: Answer[]


}