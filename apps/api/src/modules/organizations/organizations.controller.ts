import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { OrganizationsService } from "./organizations.service";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { AddParticipant } from "./dto/add-participant.dto";
import { JwtGuard } from "src/global/auth/auth.guard";
import { OrganizationExists } from "./interceptors/organization-exists.interceptor";
import { TargetUserExists } from "../user/interceptors/user-exists.interceptor";
import { UpdateParticipantDto } from "./dto/update-participant";
import { OrganizationsGuard } from "./guards/organizations.guard";
import { PutAbilities } from "src/global/rbac/decorators/rbac.decorator";
import { Action } from "src/shared/types/roles";


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
	@UseGuards(JwtGuard, OrganizationsGuard)
	@PutAbilities({ action: Action.Update, subject: 'Organization' })
	@UseInterceptors(OrganizationExists)
	async updateOrganization(
		@Body() dto: UpdateOrganizationDto,
		@Query('orgId') orgId: string
	) {
		return await this.orgService.updateOrganization(orgId, dto);
	}

	@Get(':orgId')
	@UseGuards(JwtGuard, OrganizationsGuard)
	@PutAbilities({ action: Action.Read, subject: 'Organization' })
	@UseInterceptors(OrganizationExists)
	async getOrganization(@Param('orgId') uid: string) {
		return await this.orgService.getOrgnizationByUnqiueField('id', uid);
	}

	@Delete(':orgId')
	@UseGuards(JwtGuard, OrganizationsGuard)
	@PutAbilities({ action: Action.Delete, subject: 'Organization' })
	@UseInterceptors(OrganizationExists)
	async deleteOrganization(@Param('orgId') uid: string) {
		return await this.orgService.deleteOrganization(uid);
	}

	@Post(":orgId/users")
	@UseGuards(JwtGuard, OrganizationsGuard)
	@PutAbilities({ action: Action.Create, subject: 'Organization_Users' })
	@UseInterceptors(OrganizationExists)
	async addUserToOrganization(@Param("orgId") uid: string, @Body() dto: AddParticipant) {
		return await this.orgService.addParticipant(uid, dto)
	}

	@Put(":orgId/users/:userId")
	@UseGuards(JwtGuard, OrganizationsGuard)
	@PutAbilities({ action: Action.Update, subject: 'Organization_Users' })
	@UseInterceptors(OrganizationExists, TargetUserExists)
	async updateuserOfOrganization(
		@Param("orgId") uid: string, @Body() dto: UpdateParticipantDto
	) { }

	@Delete(":orgId/users/:userId")
	@UseGuards(JwtGuard, OrganizationsGuard)
	@UseInterceptors(OrganizationExists, TargetUserExists)
	@PutAbilities({ action: Action.Delete, subject: 'Organization_Users' })
	async removeUserFromOrganization(
		@Param("orgId") uid: string,
		@Param("userId") userId: string
	) {
		return await this.orgService.removeUser(uid, userId)
	}

	@Get(':orgId/users')
	@UseGuards(JwtGuard, OrganizationsGuard)
	@PutAbilities({ action: Action.ReadAll, subject: 'Organization_Users' })
	@UseInterceptors(OrganizationExists)
	async getAllOrganizationUsers(@Param('orgId') uid: string, @Query() query: any) {
		const pagination = new PaginationDto(query.page ?? 1, query.limit ?? 50);

		return await (query.search ? this.orgService.searchInAllOrganizationUsers(query.search, uid, pagination) : this.orgService.getAllOrganizationUsers(uid, pagination));
	}

	@Get()
	@UseGuards(JwtGuard, OrganizationsGuard)
	@PutAbilities({ action: Action.ReadAll, subject: 'Organization' })
	async getAllOrganizations(@Query() query: any) {
		const pagination = new PaginationDto(query.page ?? 1, query.limit ?? 50);

		return await (query.search ? this.orgService.seearchInOrganization(query.search, pagination) : this.orgService.getAllOrganizationsWhere({}, pagination))
	}
}
