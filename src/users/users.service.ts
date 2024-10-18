    import { Injectable} from '@nestjs/common';
    import {InjectModel} from "@nestjs/sequelize";
    import {User} from "./user.model";
    import {CreateUserDto} from "./dto/create-user.dto";



    @Injectable()
    export class UsersService {

        constructor(@InjectModel(User) private userRepository: typeof User) {}


        async createUser(dto: CreateUserDto){
            const user = this.userRepository.create(dto)
            return user;
        }


        async getUser(id: number){
            const user = await this.userRepository.findByPk(id)
            return user;
        }

        async getUserByEmail(email: string){
            const user = await this.userRepository.findOne({where:{email: email}})
            return user;
        }

        async getAllUsers(){
            const users = await this.userRepository.findAll()
            return users;
        }

        async updateUser(dto: CreateUserDto, id: number){
            const user = await this.userRepository.update({
                email: dto.email,
                password: dto.password
            },
                {where: {id: id}}
            )
        }

        async deleteUser(id: number){
            const isDeleted = await this.userRepository.destroy({where: {id:id}})
            return isDeleted
        }


    }
