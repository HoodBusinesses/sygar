import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtGuard } from "src/global/auth/auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user-dtro";
import { AssignAbilityDto } from "src/modules/user/dto/assign-ability.dto";
import { AbilityService } from "../ability/abiliry.service";
import { AbilitiesGuard } from "src/global/rbac/rbac.guard";
import { PutAbilities } from "src/global/rbac/roles.decorators";
import { Action } from "src/shared/types/roles";
import { deassignAbilityDto } from './dto/deassign-ability.dto';
import { User, UserRoles } from "./model/user.model";
import { UserRepository } from "./user.repository";
import { ApiResponse } from '@nestjs/swagger';

/**
 * @class UserController
 * @description
 * This class is the controller for the User module.
*/
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
	) {}

	/**
	 * @method create
	 * @description
	 * This method is used to create a new user.
	*/
	@UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
	@PutAbilities({ action: Action.Create, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
	@Post('create') // This is the endpoint that will call the create method
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
				role: 'USER'
			}
		}
	})
	async create(@Body() createUserDto: CreateUserDto) {
		try {
			return await this.userService.create(createUserDto);
		} catch (error: any) {
			return { error: error.message }
		}
	}

	/**
	 * @method update
	 * @description
	 * This method is used to update a user.
	*/
	@UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
	@PutAbilities({ action: Action.Update, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
	@Put('update') // This is the endpoint that will call the update method
	@ApiResponse({ 
		status: 200, 
		description: 'User updated successfully.', 
		schema: {
			example: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				phone: '0987654321'
			}
		}
	})
	async update(@Body() updateUserDto: UpdateUserDto) {
		try {
			return await this.userService.update(updateUserDto);
		} catch (error: any) {
			return { error: error.message }
		}
	}

	/**
	 * @method delete
	 * @description
	 * This method is used to delete a user.
	*/
	@UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
	@PutAbilities({ action: Action.Delete, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
	@Delete('delete') // This is the endpoint that will call the delete method
	async delete(@Body() deleteUserDto: DeleteUserDto) {
		try {
			return await this.userService.delete(deleteUserDto.email);
		} catch (error: any) {
			return { error: error.message }
		}
	}

	/**
	 * @method createAbility
	 * @description
	 * This method is used to assign a new ability.
	*/
	@UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
	@PutAbilities({ action: Action.Manage, subject: 'Ability' }) // This is a decorator that ensures the user has the necessary abilities
	@Post('assign-ability') // This is the endpoint that will call the assingAbility method
	async assignAbility(@Body() assignAbilityDto: AssignAbilityDto, @Req() req: { user: User }) {
		try {
			if (req.user.role != UserRoles.SYGAR_ADMIN && assignAbilityDto.abilityType.split('_')[1] == "ORGANIZATION")
				throw Error("Only SYGAR ADMIN have the ability to manage abilities of Organizations");
			return await this.abilityService.createAbility(assignAbilityDto);
		} catch (error: any) {
			return { error: error.message }
		}
	}

	/**
	 * @method deleteAbility
	 * @description
	 * This method is used to delete an ability.
	*/
	@UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
	@PutAbilities({ action: Action.Manage, subject: 'Ability' }) // This is a decorator that ensures the user has the necessary abilities
	@Delete('deassign-ability') // This is the endpoint that will call the deleteAbility method
	async deassignAbility(@Body() deassignAbilityDto: deassignAbilityDto) {
		try {
			return await this.abilityService.deassignAbilityByUid(deassignAbilityDto);
		} catch (error: any) {
			return { error: error.message }
		}
	}

	/**
	 * The endpoint used to get a user by userUid
	 * @param userUid - The userUid of the user to get
	 * @returns The user object
	 */
	@UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
	@PutAbilities({ action: Action.Manage, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
	@Get('get')
	async getUser(@Query('userUid') userUid: string) {
		try {
			if (!userUid)
				throw Error('userUid Empty!');
			return await this.userRepository.get(userUid);
		} catch (error: any) {
			return { error: error.message }
		}
	}


	/**
	 * The endpoint used to get all users
	 * @returns The list of users
	*/
	@UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
	@PutAbilities({ action: Action.Manage, subject: 'User' }) // This is a decorator that ensures the user has the necessary abilities
	@Get('get-all')
	async getAll() {
		try {
			return await this.userRepository.getAll();
		} catch (error: any) {
			return { error: error.message }
		}
	}
}