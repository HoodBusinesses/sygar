import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { UserType } from '@prisma/client';
import { JwtGuard } from 'src/global/auth/auth.guard';
import { UsersGuard } from './guards/user.guard';
import { Action } from 'src/shared/types/roles';
import { PutAbilities } from 'src/global/rbac/decorators/rbac.decorator';
import { TargetUserExists } from './interceptors/user-exists.interceptor';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Post() // This is the endpoint that will call the create method
  @UseGuards(JwtGuard, UsersGuard)
  @PutAbilities({ action: Action.Create, subject: 'Users' })
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
  @UseGuards(JwtGuard, UsersGuard)
  @PutAbilities({ action: Action.Update, subject: 'Users' })
  @UseInterceptors(TargetUserExists)
  async update(@Body() updateUserDto: UpdateUserDto, @Param('uid') uid: string) {
    const user = await this.userService.update(uid, { phone: updateUserDto.phone, email: updateUserDto.email, firstName: updateUserDto.firstName, lastName: updateUserDto.lastName });
    return user; // Added date to response
  }

  @Delete(':uid') // This is the endpoint that will call the delete method
  @UseGuards(JwtGuard, UsersGuard)
  @PutAbilities({ action: Action.Delete, subject: 'Users' })
  @UseInterceptors(TargetUserExists)
  async delete(@Param('uid') uid: string) {

    await this.userService.delete(uid);
    return {
      message: 'User deleted successfully.',
      date: new Date().toISOString(),
    }; // Added date to response
  }

  @Get(':uid')
  @UseGuards(JwtGuard, UsersGuard)
  @PutAbilities({ action: Action.Read, subject: 'Users' })
  @UseInterceptors(TargetUserExists)
  async getUser(@Param('uid') uid: string) {
    const user = await this.userService.getByField('id', uid);

    if (!user) throw new NotFoundException('user not found')

    return user
  }

  @Get()
  @UseGuards(JwtGuard, UsersGuard)
  @PutAbilities({ action: Action.ReadAll, subject: 'Users' })
  async getAll(@Query() query: any) {
    const pagination = new PaginationDto(query.page ?? 1, query.limit ?? 50)
    const users = query.search ? await this.userService.searchInUsers(query.search, pagination, { organizationId: null }) : await this.userService.getAllUsersWhere({ organizationId: null }, pagination);
    return users
  }
}
