import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AddAbilitiesDto } from './dto/add-abilities.dto';
import { RemoveAbilitiesDto } from './dto/remove-abilities.dto';
import { AbilitiesService } from './abilities.service';

@Controller('abilities')
export class AbilitiesController {

	constructor(
		private readonly abilitiesService: AbilitiesService
	) { }

	@Post()
	async addAbilities(@Body() dto: AddAbilitiesDto) {

	}

	@Delete()
	async removeAbilities(@Body() dto: RemoveAbilitiesDto) { }

	@Get()
	async getUserAbilities(@Query('userId') userId: string, @Query('organizationId') orgId: string) {
	}
}
