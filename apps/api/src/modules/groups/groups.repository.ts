import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabseService } from "src/lib/databse/datbase.service";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { getPaginationQuery, getPaginationResponse } from "src/shared/pagination";

@Injectable()
export class GroupsRepository {

	constructor(
		private readonly dbService: DatabseService
	) { }

	async createGroup(
		data: Prisma.GroupCreateInput
	) {
		return await this.dbService.group.create({ data })
	}

	async updateGroup(
		groupId: string,
		update: Prisma.GroupUpdateInput
	) {
		return await this.dbService.group.update({
			where: { id: groupId },
			data: update
		})
	}

	async deleteGroup(groupId: string) {
		return await this.dbService.group.delete({ where: { id: groupId } })
	}

	async getGroupByUniqueField<K extends keyof Prisma.GroupWhereUniqueInput, V extends Prisma.GroupWhereUniqueInput[K]>(
		key: K,
		value: V
	) {
		return await this.dbService.group.findUnique({
			where: {
				[key]: value
			} as any
		})
	}

	async getGroupByField<K extends keyof Prisma.GroupWhereInput, V extends Prisma.GroupWhereInput[K]>(
		key: K,
		value: V
	) {
		return await this.dbService.group.findFirst({
			where: {
				[key]: value
			}
		})
	}

	async getAllGroup(where: Prisma.GroupWhereInput, pagination: PaginationDto) {

		// Fetch users based on the filter and handle pagination
		const [count, groups] = await Promise.all([
			this.dbService.group.count({ where }),
			this.dbService.group.findMany({
				where,
				...(getPaginationQuery(pagination))
			})]);

		return {
			groups,
			...(getPaginationResponse(pagination, count))
		}
	}

	async searchInAllGroups(search: string, pagination: PaginationDto, where: Prisma.GroupWhereInput) { // Define a filter that will match the search term across the desired fields
		const filter: Prisma.GroupWhereInput = {
			AND: [
				{
					OR: [
						{ animatorName: { contains: search, mode: 'insensitive' } },
						{ trainerName: { contains: search, mode: 'insensitive' } },
					]
				}, (where ? where : {})]
		};

		// Fetch users based on the filter and handle pagination
		const [count, groups] = await Promise.all([
			this.dbService.group.count({ where: filter }),
			this.dbService.group.findMany({
				where: filter,
				...(getPaginationQuery(pagination))
			})]);

		return {
			groups,
			...(getPaginationResponse(pagination, count))
		}
	}
}
