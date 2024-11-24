import { Injectable } from "@nestjs/common";
import { DatabseService } from "src/lib/databse/datbase.service";

@Injectable()
export class AbiitiesRepository {
	constructor(
		private readonly dbService: DatabseService,
	) { }

	async addAbilities() {
		return await this.dbService.ability.createMany({
			data: [
				{
					code: 1,
					action: '',
					userId: '',
					organizationId: ''
				}
			]
		})
	}

	async removeAbilities() { }

	async getUserAbilities(
		userId: string,
		organizationId?: string
	) {
		return await this.dbService.ability.findMany({ where: { userId, ...(organizationId ? { organizationId } : {}) } })
	}
}
