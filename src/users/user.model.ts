import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Res} from "@nestjs/common";
import {SurveyResponse} from "../response/models/survey-response.model";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttributes{
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {


    @ApiProperty({example: '1', description: 'id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'email', description: 'Email address'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'b17022a31abb8d4', description: 'users hashed password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => SurveyResponse)
    responses: SurveyResponse[]

}