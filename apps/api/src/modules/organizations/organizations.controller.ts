import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, Query } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { OrganizationsService } from "./organizations.service";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { AddParticipant } from "./dto/add-participant.dto";

@Controller('organizations')
export class OrganizationsController {


	constructor(
		private readonly orgService: OrganizationsService
	) { }

	@Post()
	async createOrganization(@Body() dto: CreateOrganizationDto) {
		return await this.orgService.createOrganization(dto);
	}

	@Put(':uid')
	async updateOrganization(@Body() dto: UpdateOrganizationDto, @Param('uid') uid: string) {
		return await this.orgService.updateOrganization(uid, dto);
	}

	@Get(':uid')
	async getOrganization(@Param('uid') uid: string) {
		return await this.orgService.getOrgnizationByUnqiueField('id', uid);
	}

	@Delete(':uid')
	async deleteOrganization(@Param('uid') uid: string) {
		return await this.orgService.deleteOrganization(uid);
	}

	@Post(":uid/users")
	async addUserToOrganization(@Param("uid") uid: string, @Body() dto: AddParticipant) {
		return await this.orgService.addParticipant(uid, dto)
	}

	@Post(":uid/users/:userId")
	async removeUserFromOrganization(
		@Param("uid") uid: string,
		@Param("userId") userId: string
	) {
		return await this.orgService.removeUser(uid, userId)
	}

	@Get(':uid/users')
	async getAllOrganizationUsers(@Param('uid') uid: string, @Query() query: any) {
		const pagination = new PaginationDto(query.page ?? 1, query.limit ?? 50);

		return await (query.search ? this.orgService.searchInAllOrganizationUsers(query.search, uid, pagination) : this.orgService.getAllOrganizationUsers(uid, pagination));
	}

	@Get()
	async getAllOrgabizations(@Query() query: any) {
		const pagination = new PaginationDto(query.page ?? 1, query.limit ?? 50);

		return await (query.search ? this.orgService.seearchInOrganization(query.search, pagination) : this.orgService.getAllOrganizationsWhere({}, pagination))
	}
}
