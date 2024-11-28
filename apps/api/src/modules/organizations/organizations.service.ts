import { UseGuards, ConflictException, Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { OrganizationsRepository } from "./organizations.repository";
import { UserService } from "../user/user.service";
import { AuthService } from "src/global/auth/auth.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { Organization, Prisma, Role, User, UserType } from "@prisma/client";
import { AddParticipant } from "./dto/add-participant.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { AbilityFactory } from "src/global/rbac/rbac.service";
import { Action, internalSubject } from "src/shared/types/roles";

@Injectable()
export class OrganizationsService {
	constructor(
		private readonly orgRepository: OrganizationsRepository,
		private readonly userService: UserService,
		private readonly authService: AuthService,
		private readonly abilitiesFactory: AbilityFactory
	) { }


	async createOrganization({ owner, ...orgData }: CreateOrganizationDto) {

		const existedOrg = await this.getOrgnizationByUnqiueField('cnss', orgData.cnss);

		if (existedOrg) {
			throw new ConflictException('organization aith same cnss already exist')
		}

		const existedUser = await this.userService.getAllUsersWhere({
			OR: [
				{ email: owner.email },
				{ cnss: +owner.cnss }
			]
		}, new PaginationDto())

		if (existedUser.users.length) {
			throw new ConflictException('Already existed user with same email or cnss')
		}
		const org = await this.orgRepository.createOrganization({
			name: orgData.name,
			cnss: orgData.cnss,
			ice: orgData.ice,
			address: orgData.address,
			imageLink: orgData.imageLink
		})

		const user = await this.addParticipant(org.id, { ...owner, role: Role.Owner, organizationId: org.id })

		return {
			user,
			organization: org
		}
	}

	async addParticipant(orgId: string, dto: AddParticipant) {

		const existedUser = await this.userService.getAllUsersWhere({
			OR: [
				{ email: dto.email },
				{ cnss: +dto.cnss }
			]
		}, new PaginationDto())

		if (existedUser.users.length) {
			throw new ConflictException('Already existed user with same email or cnss')
		}

		const user = await this.userService.create({
			firstName: dto.firstName,
			lastName: dto.lastName,
			role: dto.role,
			cnss: +dto.cnss,
			email: dto.email,
			phone: dto.phone,
			identity: dto.identity,
			identityType: dto.identityType,
			type: UserType.ORGANIZATION_USER,
			organization: { connect: { id: orgId } }
		})

		await this.authService.requestActiveAccount(user.email)
	}

	async removeUser(orgId: string, userId: string) {
		await this.userService.delete(userId);
	}

	async updateOrganization(orgId: string, dto: UpdateOrganizationDto) {
		const newOrg = this.orgRepository.updateOrganization(orgId, { name: dto.name, address: dto.address, ice: dto.ice, imageLink: dto.imageLink })
		return newOrg
	}

	async getAllOrganizationUsers(orgId: string, pagination: PaginationDto) {
		return this.userService.getAllUsersWhere(
			{ organizationId: orgId },
			pagination
		)
	}

	async searchInAllOrganizationUsers(search: string, orgId: string, pagination: PaginationDto) {
		return this.userService.searchInUsers(
			search,
			pagination,
			{ organizationId: orgId },
		)
	}

	async deleteOrganization(orgId: string) {
		return await this.orgRepository.deleteOrganization(orgId)
	}

	async getOrgnizationByUnqiueField<K extends keyof Prisma.OrganizationWhereUniqueInput, V>(key: K, value: V) {
		return await this.orgRepository.getOrganizationByUinqueField(key, value);
	}

	async getOrgnizationByField<K extends keyof Prisma.OrganizationWhereUniqueInput, V>(
		key: K,
		value: V
	) {
		return await this.orgRepository.getOrganizationByField(key, value);
	}

	async seearchInOrganization(search: string, pagination: PaginationDto) {
		return await this.orgRepository.searchOnOrganizations(search, pagination);
	}

	async getAllOrganizationsWhere(where: Prisma.OrganizationWhereInput, pagination: PaginationDto) {
		return await this.orgRepository.getAllOrganizationsWhere(where, pagination);
	}
}
