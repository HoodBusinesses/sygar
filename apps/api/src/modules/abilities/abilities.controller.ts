import { Body, Controller, Delete, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AddAbilitiesDto } from './dto/add-abilities.dto';
import { RemoveAbilitiesDto } from './dto/remove-abilities.dto';
import { AbilitiesService } from './abilities.service';
import { TargetUserExists } from '../user/interceptors/user-exists.interceptor';
import { OrganizationExists } from '../organizations/interceptors/organization-exists.interceptor';
import { PutAbilities } from 'src/global/rbac/decorators/rbac.decorator';
import { Action } from 'src/shared/types/roles';
import { JwtGuard } from 'src/global/auth/auth.guard';
import { AbilitiesGuard } from './guards/abilities.guard';

@Controller('abilities')
export class AbilitiesController {

	constructor(
		private readonly abilitiesService: AbilitiesService
	) { }

	@Post()
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({
		action: Action.Create,
		subject: 'Ability'
	})
	@UseInterceptors(TargetUserExists, OrganizationExists)
	async addAbilities(@Body() dto: AddAbilitiesDto) {
		return await this.abilitiesService.addAbilities(dto);
	}

	@Delete()
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({
		action: Action.Delete,
		subject: 'Ability'
	})
	@UseInterceptors(TargetUserExists, OrganizationExists)
	async removeAbilities(@Body() dto: RemoveAbilitiesDto) {
		return await this.abilitiesService.removeAbilities(dto);
	}

	@Get()
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({
		action: Action.ReadAll,
		subject: 'Ability'
	})
	@UseInterceptors(TargetUserExists, OrganizationExists)
	async getUserAbilities(@Query('userId') userId: string, @Query('organizationId') orgId: string) {
		return await this.abilitiesService.getAllUserAbilities(userId, orgId)
	}
}
