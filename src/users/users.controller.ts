import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getUserById(@Param('id') id: number){
        const user = this.userService.getUser(id)
        return user;

    }


    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAllUsers(){
        const users = this.userService.getAllUsers()
        return users;
    }

    @ApiOperation({summary: 'Update user'})
    @ApiResponse({status: 200, type: User})
    @Put(':id')
    updateUser(@Body() dto: CreateUserDto,
               @Param('id') id: number){
        const user = this.userService.updateUser(dto, id)
        return user;
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status: 200, type: Boolean})
    @Delete(':id')
    deleteUser(@Param('id') id: number){
        const user = this.userService.deleteUser(id)
        return user;
    }



}
