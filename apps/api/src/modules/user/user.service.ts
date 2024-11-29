import { ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Prisma } from '@prisma/client';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { AuthService } from 'src/global/auth/auth.service';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository, // Inject the user repository for database operations
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) { }

  async create(user: Prisma.UserCreateInput) {
    let userExists = await this.userRepository.getByFieldUnique('email', user.email);

    if (userExists) {
      throw new ConflictException('alreadyExistsWithThisEmail');
    }

    // check if the user already exists with the provided CNSS
    userExists = await this.userRepository.getByFieldUnique('cnss', +user.cnss);

    if (userExists) {
      throw new ConflictException('alreadyExistsWithThisCNSS');
    }

    const newUser = await this.userRepository.create(user);

    // await this.authService.requestActiveAccount(newUser.email)

    return newUser;
  }


  async getAllUsersWhere(filter: Prisma.UserWhereInput, pagination: PaginationDto) {
    return await this.userRepository.getAllUsersWhere(filter, pagination)
  }

  async searchInUsers(search: string, pagination: PaginationDto, where?: Prisma.UserWhereInput) {
    return await this.userRepository.searchUsers(search, pagination, where);
  }


  async update(uid: string, user: Prisma.UserUpdateInput) {
    // Check if the user exists
    const existingUser = await this.userRepository.getByFieldUnique('id', uid);

    if (!existingUser) {
      throw new Error('userNotFound');
    }

    if (
      user.email &&
      (await this.userRepository.getByFieldUnique('email', user.email as string))
    ) {
      throw new Error('alreadyExistsWithThisEmail');
    }

    return await this.userRepository.updateUser(uid, user);
  }

  async delete(uid: string) {
    // Check if the user exists
    const existingUser = await this.userRepository.getByFieldUnique('id', uid);

    if (!existingUser) {
      throw new Error('userNotFound');
    }

    // TODO: remove all user related data
    return await this.userRepository.deleteUser(uid);
  }

  async getByFieldUnique<T extends keyof Prisma.UserWhereUniqueInput>(
    field: T,
    value: Prisma.UserWhereUniqueInput[T],
  ) {
    return await this.userRepository.getByFieldUnique(field, value);
  }

  async getByField<T extends keyof Prisma.UserWhereUniqueInput>(
    field: T,
    value: Prisma.UserWhereUniqueInput[T],
  ) {
    return await this.userRepository.getByField(field, value);
  }

}
