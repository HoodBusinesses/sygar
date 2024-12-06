import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Controller('group')
export class GroupsController {

	constructor(
		private readonly groupService: GroupsService
	) { }


	@Post()
	async createGroup(@Body() dto: CreateGroupDto) {
		return await this.groupService.createGroup({
      trainerName: dto.trainerName,
      address: dto.address,
      animatorName: dto.animatorName,
      theme: { connect: { id: dto.themeId } },
      organization: { connect: { id: dto.organizationId } },
    });
	}

	@Put(":groupId")
	async updateGroup(
		@Body() dto: UpdateGroupDto,
		@Param("groupId") groupId: string
	) {
		return await this.groupService.updateGroup(groupId, {
			...(dto.trainerName ? { trainerName: dto.trainerName } : {}),
			...(dto.animatorName ? { animatorName: dto.animatorName } : {}),
			...(dto.address ? { address: dto.address } : {}),

		})
	}

	@Delete(":groupId")
	async deleteGroup(
		@Param("groupId") groupId: string,
		@Query('organizationId') organizationId: string
	) {
		if (!organizationId) throw new BadRequestException();

		return await this.groupService.deleteGroup(groupId);
	}


	@Get(":groupId")
	async getGroup(
		@Param("groupId") groupId: string,
		@Query('organizationId') organizationId: string
	) {
		if (!organizationId) throw new BadRequestException();

		return await this.groupService.getGroupByUniqueField('id', groupId);
	}

	@Get()
	async getAllGroup(
		@Query() query: any
	) {
		if (!query.organizationId && !query.themeId) throw new BadRequestException('pls add organizationId')

		return await (
			query.search ? this.groupService.searchInAllGroup(
				query.search,
				new PaginationDto(+(query.page || 1), +(query.limit || 50)),
				{ organizationId: query.organizationId, themeId: query.themeId }
			) : this.groupService.getAllGroup({ organizationId: query.organizationId, themeId: query.themeId },
				new PaginationDto(+(query.page || 1), +(query.limit || 50)),
			)
		)
	}
}
