import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { OrganizationsService } from "./organizations.service";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { AddParticipant } from "./dto/add-participant.dto";
import { JwtGuard } from "src/global/auth/auth.guard";
import { GetUser } from "src/shared/decorators/user";

import type { Organization, User } from "@prisma/client";
import { GetOrganization } from "src/shared/decorators/organization";
import { OrganizationExists } from "src/shared/interceptors/organization-exists.interceptor";


@Controller('organizations')
export class OrganizationsController {


	constructor(
		private readonly orgService: OrganizationsService
	) { }

	@Post()
	async createOrganization(@Body() dto: CreateOrganizationDto) {
		return await this.orgService.createOrganization(dto);
	}

	@Put(':orgId')
	@UseInterceptors(OrganizationExists)
	@UseGuards(JwtGuard)
	async updateOrganization(
		@Body() dto: UpdateOrganizationDto,
		@GetUser() user: User,
		@GetOrganization() org: Organization
	) {
		console.log(
			user, org
		)
		return await this.orgService.updateOrganization(user, org, dto);
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
