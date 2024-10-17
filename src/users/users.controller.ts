import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    createUser(@Body() dto: CreateUserDto){
        const user = this.userService.createUser(dto)
        return user;
    }

    @Get(':id')
    getUserById(@Param('id') id: number){
        const user = this.userService.getUser(id)
        return user;

    }

    @Get()
    getAllUsers(){
        const users = this.userService.getAllUsers()
        return users;
    }

    @Put(':id')
    updateUser(@Body() dto: CreateUserDto,
               @Param('id') id: number){
        const user = this.userService.updateUser(dto, id)
        return user;
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number){
        const user = this.userService.deleteUser(id)
        return user;
    }



}
