import { Injectable } from '@nestjs/common';
import { AddAbilitiesDto } from './dto/add-abilities.dto';
import { RemoveAbilitiesDto } from './dto/remove-abilities.dto';
import { AbilitiesRepository } from './abilities.repository';

@Injectable()
export class AbilitiesService {
	constructor(
		private readonly abilitiesRepository: AbilitiesRepository,
	) { }


	async addAbilities(dto: AddAbilitiesDto) {
		return await this.abilitiesRepository.addAbilities(
			dto.abilities.map(ability => ({
				action: ability.action,
				code: +ability.code,
				userId: dto.userId,
				...(dto.organizationId ? { organizationId: dto.organizationId } : {})
			}))
		)
	}

	async removeAbilities(dto: RemoveAbilitiesDto) {
		return await this.abilitiesRepository.removeAbilities(
			dto.abilities.map(ability => +ability.code),
			dto.userId,
			dto.organizationId
		)
	}

	async getAllUserAbilities(userId: string, orgId?: string) {
		return await this.abilitiesRepository.getUserAbilities(userId, orgId)
	}
}
