import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabseService } from "src/lib/databse/datbase.service";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { getPaginationQuery, getPaginationResponse } from "src/shared/pagination";

@Injectable()
export class OrganizationsRepository {
	constructor(private readonly dbService: DatabseService) { }


	async createOrganization(data: Prisma.OrganizationCreateInput) {
		return await this.dbService.organization.create({ data })
	}

	async updateOrganization(uid: string, data: Prisma.OrganizationUpdateInput) {
		return await this.dbService.organization.update({ where: { id: uid }, data })
	}

	async getOrganizationByUinqueField<T extends keyof Prisma.OrganizationWhereUniqueInput, V>(k: T, v: V) {
		return await this.dbService.organization.findUnique({
			where: {
				...{ [k]: v } as unknown as Prisma.OrganizationWhereUniqueInput
			}
		})
	}

	async getOrganizationByField<T extends keyof Prisma.OrganizationWhereInput, V>(k: T, v: V) {
		return await this.dbService.organization.findFirst({
			where: {
				...{ [k]: v } as unknown as Prisma.OrganizationWhereInput
			}
		})
	}


	async getAllOrganizationsWhere(where: Prisma.OrganizationWhereInput, pagination: PaginationDto) {
		const [count, organizations] = await Promise.all([
			this.dbService.organization.count({ where }),
			this.dbService.organization.findMany({
				where,
				...(getPaginationQuery(pagination))
			})
		])


		return {
			organizations,
			...(getPaginationResponse(pagination, count))
		}
	}

	async deleteOrganization(id: string) {
		return await this.dbService.organization.delete({ where: { id } })
	}


	async searchOnOrganizations(search: string, pagination: PaginationDto) {
		return await this.dbService.organization.findMany({
			where: {
				name: { contains: search, mode: 'insensitive' }
			},
			skip: pagination.getSkip(),
			take: pagination.limit
		})
	}
}
