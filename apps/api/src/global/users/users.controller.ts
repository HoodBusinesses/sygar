import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { use } from "passport";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { AbilitiesGuard } from "../rbac/rbac.guard";
import { PutAbilities } from "../rbac/roles.decorators";
import { Action } from "src/shared/types/roles";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
	) {}

	@Post('create')
	@PutAbilities({ action: Action.Create, subject: 'User'})
	@UseGuards(JwtAuthGuard, AbilitiesGuard)
	async createUser(@Body() createUserDto: CreateUserDto) {
		try {
			return await this.usersService.createUser(createUserDto);
		}
		catch (error: any) {
			return { message: error.message };
		}
	}

}