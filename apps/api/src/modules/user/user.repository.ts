import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  DeleteItemCommandInput,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { DatabseService } from 'src/global/databse/datbase.service';
import { IdentityType, Prisma, Role, User, UserType } from '@prisma/client';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export enum UpdateAction {
  SET,
  REMOVE
}

/**
 * @class UserRepository
 * @description
 * This class is responsible for managing users in the database.
 */
@Injectable()
export class UserRepository {

  constructor(
    private readonly dbService: DatabseService,
  ) {
  }

  async create(user: CreateUserDto): Promise<User> {
    const returnedUser = await this.dbService.user.create({
      data: {
        phone: user.phone,
        cnss: +user.cnss,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        role: user.role,
        identityType: user.identityType,
        identity: user.identity,
        type: UserType.SOLUTION_OWNER
      }
    })
    return returnedUser
  }

  async searchUsers(
    searchTerm: string,
    pagination: PaginationDto
  ) {
    // Define a filter that will match the search term across the desired fields
    const filter: Prisma.UserWhereInput = {
      OR: [
        { firstName: { contains: searchTerm, mode: 'insensitive' } },
        { lastName: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
        { phone: { contains: searchTerm, mode: 'insensitive' } },
        { identity: { contains: searchTerm, mode: 'insensitive' } },
      ],
    };

    // Fetch users based on the filter and handle pagination
    return await this.dbService.user.findMany({
      where: filter,
      skip: pagination.getSkip(),
      take: pagination.limit,
    });
  }

  async getAllUsersWhere(filter: Prisma.UserWhereInput, pagination: PaginationDto) {
    return await this.dbService.user.findMany({ where: filter, skip: pagination.getSkip(), take: pagination.limit })
  }

  async getByFieldUnique<T extends keyof Prisma.UserWhereUniqueInput>(
    field: T,
    value: Prisma.UserWhereUniqueInput[T],
  ): Promise<User | null> {
    const user = await this.dbService.user.findUnique({
      where: {
        [field]: value,
      } as any as Prisma.UserWhereUniqueInput, // Explicitly cast the object
    });
    return user;
  }

  async getByField<T extends keyof Prisma.UserWhereInput>(
    field: T,
    value: Prisma.UserWhereUniqueInput[T],
  ): Promise<User | null> {
    const user = await this.dbService.user.findFirst({
      where: {
        [field]: value,
      }, // Explicitly cast the object
    });
    return user;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.dbService.user.update({ where: { id }, data })
  }

  async deleteUser(uid: string) {
    return await this.dbService.user.delete({ where: { id: uid } })
  }

}
