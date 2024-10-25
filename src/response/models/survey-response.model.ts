    import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {User} from "../../users/user.model";
import {Survey} from "../../surveys/surveys.model";
import {Answer} from "./answer.model";
    import {ApiProperty} from "@nestjs/swagger";


interface SurveyResponseCreationAttributes{
    surveyId: number;
    userId: number;
}



@Table({tableName: 'responses'})
export class SurveyResponse extends Model<SurveyResponse, SurveyResponseCreationAttributes> {

    @ApiProperty({example: "1", description: 'id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "1", description: 'responses user id'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User

    @ApiProperty({example: "1", description: 'responses survey id'})
    @ForeignKey(() => Survey)
    @Column({type: DataType.INTEGER})
    surveyId: number;

    @BelongsTo(() => Survey)
    survey: Survey

    @HasMany(() => Answer)
    answers: Answer[]


}