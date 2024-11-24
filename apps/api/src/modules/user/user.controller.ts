import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Action } from 'src/shared/types/roles';
import { User, UserRoles } from './model/user.model';
import { UserRepository } from './user.repository';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { UserType } from '@prisma/client';

/**
 * @class UserController
 * @description
 * This class is the controller for the User module.
 */
@ApiTags('user')
@Controller('user')
export class UserController {
  /**
   * @constructor
   * @description
   * This constructor is used to inject the UserService and AbilityService into the controller.
   */
  constructor(
    private readonly userService: UserService,
  ) { }

  /**
   * The endpoint used to create a user
   * @param createUserDto The DTO containing the user information
   * @returns The user created
   */
  @Post() // This is the endpoint that will call the create method
  async create(
    @Body() user: CreateUserDto,

  ) {
    const createdUser = await this.userService.create({
      phone: user.phone,
      cnss: +user.cnss,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      role: user.role,
      identityType: user.identityType,
      identity: user.identity,
      type: UserType.SOLUTION_OWNER

    });
    return { createdUser, date: new Date().toISOString() }; // Added date to response

  }


  @Put(':uid') // This is the endpoint that will call the update method
  async update(@Body() updateUserDto: UpdateUserDto, @Param('uid') uid: string) {
    const user = await this.userService.update(uid, { phone: updateUserDto.phone, email: updateUserDto.email, firstName: updateUserDto.firstName, lastName: updateUserDto.lastName });
    return user; // Added date to response
  }

  /**
   * The endpoint used to delete a user
   * @param deleteUserDto The DTO containing the userUid
   * @returns a success message if the user is deleted successfully
   */
  @Delete(':uid') // This is the endpoint that will call the delete method
  async delete(@Param('uid') uid: string) {

    await this.userService.delete(uid);
    return {
      message: 'User deleted successfully.',
      date: new Date().toISOString(),
    }; // Added date to response
  }

  @Get(':uid')
  async getUser(@Param('uid') uid: string) {
    const user = await this.userService.getByField('id', uid);

    if (!user) throw new NotFoundException('user not found')

    return user
  }

  @Get()
  async getAll(@Query() query: any) {
    const pagination = new PaginationDto(query.page ?? 1, query.limit ?? 50)
    const users = query.search ? await this.userService.searchInUsers(query.search, pagination) : await this.userService.getAllUsersWhere({}, pagination);
    return users
  }
}
