import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Res} from "@nestjs/common";
import {SurveyResponse} from "../response/models/survey-response.model";

interface UserCreationAttributes{
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => SurveyResponse)
    responses: SurveyResponse[]

}