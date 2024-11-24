import { Injectable, NotFoundException } from "@nestjs/common";
import { OrganizationsRepository } from "./organizations.repository";
import { UserService } from "../user/user.service";
import { AuthService } from "src/global/auth/auth.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { Prisma, Role, UserType } from "@prisma/client";
import { AddParticipant } from "./dto/add-participant.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";

@Injectable()
export class OrganizationsService {
	constructor(
		private readonly orgRepository: OrganizationsRepository,
		private readonly userService: UserService,
		private readonly authService: AuthService
	) { }


	async createOrganization({ owner, ...orgData }: CreateOrganizationDto) {
		const org = await this.orgRepository.createOrganization({
			name: orgData.name,
			cnss: orgData.cnss,
			ice: orgData.ice,
			address: orgData.address,
			imageLink: orgData.imageLink
		})

		await this.addParticipant(org.id, { ...owner, role: Role.Owner })
	}

	async addParticipant(orgId: string, dto: AddParticipant) {
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
		const org = await this.orgRepository.getAllOrganizationsWhere({
			users: {
				some: { id: userId }
			},
			id: orgId
		}, new PaginationDto())

		if (!org.organizations.length) {
			throw new NotFoundException('user not found');
		}

		await this.userService.delete(userId);
		// TODO: remove all users Data
	}


	async updateOrganization(orgId: string, dto: UpdateOrganizationDto) {
		const org = this.orgRepository.getOrganizationByUinqueField('id', orgId)

		if (!org) throw new NotFoundException()

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
