import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/global/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user-dtro';
import { AssignAbilityDto } from 'src/modules/user/dto/assign-ability.dto';
import { AbilityService } from '../ability/abiliry.service';
import { AbilitiesGuard } from 'src/global/rbac/rbac.guard';
import { PutAbilities } from 'src/global/rbac/roles.decorators';
import { Action } from 'src/shared/types/roles';
import { DeassignAbilityDto } from './dto/deassign-ability.dto';
import { User, UserRoles } from './model/user.model';
import { UserRepository } from './user.repository';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageService } from 'src/global/language/language.service';

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
    private readonly userRepository: UserRepository, // Inject the user repository for database operations
    private readonly abilityService: AbilityService,
    private readonly languageService: LanguageService
  ) {}

  /**
   * The endpoint used to create a user
   * @param createUserDto The DTO containing the user information
   * @returns The user created
   */
  @UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
  @PutAbilities({ action: Action.Create, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
  @Post('create') // This is the endpoint that will call the create method
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    schema: {
      example: {
        cnss: '123456789',
        nationalIdentifier: 'NID123456',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890',
        role: 'USER',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: { headers: Record<string, any>; user: User }
  ) {
    const lang = req.headers['accept-language'] ?? 'en'; // Get the language from the request headers or default to 'en'

    try {
      const user = await this.userService.create(createUserDto, req.user.uid);
      return { user, date: new Date().toISOString() }; // Added date to response
    } catch (error: any) {
      throw new HttpException(
        {
          error: this.languageService.getTranslation(error.message, lang),
          date: new Date().toISOString(),
        },
        400
      ); // Added date to error response
    }
  }

  /**
   * The endpoint used to update a user
   * @param updateUserDto The DTO containing the userUid and the new user data
   * @returns The user updated
   */
  @UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
  @PutAbilities({ action: Action.Update, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
  @Put('update') // This is the endpoint that will call the update method
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    schema: {
      example: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '0987654321',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const header: Record<string, any> = req.headers; // Changed object to Record<string, any>
    const lang = header['accept-language'] ?? 'en'; // Get the language from the request headers or default to 'en'

    try {
      const user = await this.userService.update(updateUserDto);
      return { user, date: new Date().toISOString() }; // Added date to response
    } catch (error: any) {
      throw new HttpException(
        {
          error: this.languageService.getTranslation(error.message, lang),
          date: new Date().toISOString(),
        },
        400
      ); // Added date to error response
    }
  }

  /**
   * The endpoint used to delete a user
   * @param deleteUserDto The DTO containing the userUid
   * @returns a success message if the user is deleted successfully
   */
  @UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
  @PutAbilities({ action: Action.Delete, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
  @Delete('delete') // This is the endpoint that will call the delete method
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async delete(@Body() deleteUserDto: DeleteUserDto, @Req() req: Request) {
    const header: Record<string, any> = req.headers; // Changed object to Record<string, any>
    const lang = header['accept-language'] ?? 'en'; // Get the language from the request headers or default to 'en'

    try {
      await this.userService.delete(deleteUserDto.email);
      return {
        message: 'User deleted successfully.',
        date: new Date().toISOString(),
      }; // Added date to response
    } catch (error: any) {
      throw new HttpException(
        {
          error: this.languageService.getTranslation(error.message, lang),
          date: new Date().toISOString(),
        },
        400
      ); // Added date to error response
    }
  }

  /**
   * The endpoint used to assign an ability to a user
   * @param assignAbilityDto The DTO containing the userUid and the abilityType
   * @returns The ability assigned to the user
   */
  @UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
  @PutAbilities({ action: Action.Manage, subject: 'Ability' }) // This is a decorator that ensures the user has the necessary abilities
  @Post('assign-ability') // This is the endpoint that will call the assingAbility method
  @ApiOperation({ summary: 'Assign an ability to a user' })
  @ApiResponse({
    status: 201,
    description: 'Ability assigned successfully.',
    schema: {
      example: {
        PK: 'Ability',
        SK: 'Ability',
        identifier: '`${ability.uid}#${ability.abilityType}`',
        action: 'Manage',
        subject: 'User',
        userUid: 'user-123',
        organizationId: 'org-123',
        createdAt: '2022-01-01T00:00:00.000Z',
        updatedAt: '2022-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async assignAbility(
    @Body() assignAbilityDto: AssignAbilityDto,
    @Req() req: { user: User; headers: Record<string, any> }
  ) {
    const header = req.headers;
    const lang = header['accept-language'] ?? 'en'; // Get the language from the request headers or default to 'en'

    try {
      if (
        req.user.role != UserRoles.SYGAR_ADMIN &&
        assignAbilityDto.abilityType.split('_')[1] == 'ORGANIZATION'
      )
        throw Error('onlySygarAdminMangeOrgAbilities');
      const ability = await this.abilityService.createAbility(assignAbilityDto);
      return { ability, date: new Date().toISOString() }; // Added date to response
    } catch (error: any) {
      throw new HttpException(
        {
          error: this.languageService.getTranslation(error.message, lang),
          date: new Date().toISOString(),
        },
        400
      ); // Added date to error response
    }
  }

  /**
   * The endpoint used to deassign an ability from a user
   * @param deassignAbilityDto The DTO containing the userUid and the abilityType
   * @returns a success message if the ability is deassigned successfully
   */
  @UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
  @PutAbilities({ action: Action.Manage, subject: 'Ability' }) // This is a decorator that ensures the user has the necessary abilities
  @Delete('deassign-ability') // This is the endpoint that will call the deleteAbility method
  @ApiOperation({ summary: 'Deassign an ability from a user' })
  @ApiResponse({
    status: 200,
    description: 'Ability deassigned successfully.',
    schema: {
      example: {
        message: 'Ability deassigned successfully.',
        date: '2022-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async deassignAbility(
    @Body() deassignAbilityDto: DeassignAbilityDto,
    @Req() req: Request
  ) {
    const header: Record<string, any> = req.headers;
    const lang = header['accept-language'] ?? 'en'; // Get the language from the request headers or default to 'en'

    try {
      await this.abilityService.deassignAbilityByUid(deassignAbilityDto);
      return {
        message: 'Ability deassigned successfully.',
        date: new Date().toISOString(),
      }; // Added date to response
    } catch (error: any) {
      throw new HttpException(
        {
          error: this.languageService.getTranslation(error.message, lang),
          date: new Date().toISOString(),
        },
        400
      ); // Added date to error response
    }
  }

  /**
   * The endpoint used to get a user if the userUid is provided
   * @returns The user with the userUid provided o
   * @returns An error message if the userUid or organizationId is not provided
   */
  @UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
  @PutAbilities({ action: Action.Manage, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
  @ApiOperation({ summary: 'Get a user by userUid' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully.',
    schema: {
      example: {
        cnss: '123456789',
        nationalIdentifier: 'NID123456',
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@hoood.com',
        // etc"
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Get('get')
  async getUser(@Query('uid') uid: string, @Req() req: Request) {
    const header: Record<string, any> = req.headers;
    const lang = header['accept-language'] ?? 'en';
    try {
      const { password, ...user } = await this.userRepository.get(uid);
      return { user, date: new Date().toISOString() }; // Added date to response
    } catch (error: any) {
      throw new HttpException(
        {
          error: this.languageService.getTranslation(error.message, lang),
          date: new Date().toISOString(),
        },
        400
      );
    }
  }

  /**
   * The endpoint used to get a all users of an organization
   * @returns The list of users of the organization
   */
  @UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authentic                                                             ated and has the necessary abilities
  @PutAbilities({ action: Action.Manage, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
  @ApiOperation({ summary: 'Get all users by organizationId' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Get('get-by-organizationid')
  async getByOrganizationId(@Query('organizationId') organizationId: string) {
    try {
      const users =
        await this.userRepository.findByOrganizationId(organizationId);
      return { users, date: new Date().toISOString() }; // Added date to response
    } catch (error: any) {
      throw new HttpException(
        { error: error.message, date: new Date().toISOString() },
        400
      );
    }
  }

  /**
   * The endpoint used to get all users
   * @returns The list of users
   */
  @UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
  @PutAbilities({ action: Action.Manage, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully.',
    schema: {
      example: {
        users: [
          {
            cnss: '123456789',
            nationalIdentifier: 'NID123456',
            firstName: 'John',
            lastName: 'Doe',
            email: 'example@hood.com',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Get('get-all')
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully.',
  })
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    try {
      const users = await this.userRepository.getAll(page, limit);
      return { users, date: new Date().toISOString() }; // Added date to response
    } catch (error: any) {
      throw new HttpException(
        { error: error.message, date: new Date().toISOString() },
        400
      );
    }
  }
}
