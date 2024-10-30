    import {HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
    import {InjectModel} from "@nestjs/sequelize";
    import {User} from "./user.model";
    import {CreateUserDto} from "./dto/create-user.dto";



    @Injectable()
    export class UsersService {

        constructor(@InjectModel(User) private userRepository: typeof User) {}


        async createUser(dto: CreateUserDto){
            const user = await this.userRepository.create(dto)
            return user;
        }


        async getUser(id: number){
            const user = await this.userRepository.findByPk(id)
            if(!user) return new NotFoundException(`User with id ${id} not found`)
            return user;
        }

        async getUserByEmail(email: string){
            const user = await this.userRepository.findOne({where:{email: email}})
            if(!user) return new NotFoundException(`User with email ${email} not found`)
            return user;
        }

        async getAllUsers(){
            const users = await this.userRepository.findAll()
            if(!users) return new NotFoundException(`Users not found`)
            return users;
        }

        async updateUser(dto: CreateUserDto, id: number){
            const user = await this.userRepository.update(
                dto,
                {where: {id: id}}
            )
            if(!user) return new NotFoundException(`User with id ${id} not found`)
            return user
        }

        async deleteUser(id: number){
            const isDeleted = await this.userRepository.destroy({where: {id:id}})
            if (!isDeleted) return new NotFoundException(`User with id ${id} not found`)
            return isDeleted
        }


    }
