import { Body, Controller, Delete, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtGuard } from "src/global/auth/auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user-dtro";
import { CreateAbilityDto } from "src/modules/user/dto/create-ability.dto";
import { AbilityService } from "../ability/abiliry.service";
import { AbilitiesGuard } from "src/global/rbac/rbac.guard";
import { PutAbilities } from "src/global/rbac/roles.decorators";
import { Action } from "src/shared/types/roles";
import { DeleteAbilityDto } from './dto/delete-ability.dto';

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
	 * This method is used to create a new ability.
	*/
	@UseGuards(JwtGuard, AbilitiesGuard) // This is a guard that ensures the user is authenticated and has the necessary abilities
	@PutAbilities({ action: Action.Manage, subject: 'Ability' }) // This is a decorator that ensures the user has the necessary abilities
	@Post('create-ability') // This is the endpoint that will call the createAbility method
	async createAbility(@Body() createAbilityDto: CreateAbilityDto) {
		try {
			return await this.abilityService.createAbility(createAbilityDto);
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
	@Delete('delete-ability') // This is the endpoint that will call the deleteAbility method
	async deleteAbility(@Body() deleteAbilityDto: DeleteAbilityDto) {
		try {
			return await this.abilityService.deleteAbilityByUid(deleteAbilityDto);
		} catch (error: any) {
			return { error: error.message }
		}
	}
}