import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { GroupsRepository } from "./groups.repository";

@Injectable()
export class GroupsService {
	constructor(
		private readonly groupsRepository: GroupsRepository
	) { }

	async createGroup(
		data: Prisma.GroupCreateInput
	) {
		return await this.groupsRepository.createGroup(data)
	}

	async updateGroup(
		groupId: string,
		update: Prisma.GroupUpdateInput
	) {
		return await this.groupsRepository.updateGroup(groupId, update)
	}

	async deleteGroup(groupId: string) {
		return await this.groupsRepository.deleteGroup(groupId);
	}

	async getGroupByUniqueField<K extends keyof Prisma.GroupWhereUniqueInput, V extends Prisma.GroupWhereUniqueInput[K]>(
		key: K,
		value: V
	) {
		return await this.groupsRepository.getGroupByUniqueField(key, value)
	}

	async getGroupByField<K extends keyof Prisma.GroupWhereInput, V extends Prisma.GroupWhereInput[K]>(
		key: K,
		value: V
	) {
		return await this.groupsRepository.getGroupByField(key, value)
	}

	async getAllGroup(where: Prisma.GroupWhereInput, pagination: PaginationDto) {
		return await this.groupsRepository.getAllGroup(
			where,
			pagination
		)

	}

	async searchInAllGroup(search: string, pagination: PaginationDto, where: Prisma.GroupWhereInput) { // Define a filter that will match the search term across the desired fields
		return await this.groupsRepository.searchInAllGroups(search, pagination, where)
	}
}
