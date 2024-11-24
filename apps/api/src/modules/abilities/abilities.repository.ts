import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabseService } from "src/lib/databse/datbase.service";

@Injectable()
export class AbilitiesRepository {
	constructor(
		private readonly dbService: DatabseService,
	) { }

	async addAbilities(
		data: Prisma.AbilityCreateManyInput[]
	) {
		return await this.dbService.ability.createMany({
			data
		})
	}

	async removeAbilities(codes: number[], userId: string, organizationId?: string) {

		return await this.dbService.ability.deleteMany(
			{
				where: {
					code: { in: codes },
					userId,
					... (organizationId ? { organizationId } : {})
				}
			}
		)
	}

	async getUserAbilities(
		userId: string,
		organizationId?: string
	) {
		return await this.dbService.ability.findMany({ where: { userId, ...(organizationId ? { organizationId } : {}) } })
	}
}
