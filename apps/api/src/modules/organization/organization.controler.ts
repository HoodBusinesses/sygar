import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/global/auth/auth.guard";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { OrganizationService } from "./organization.service";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { AbilitiesGuard } from "src/global/rbac/rbac.guard";
import { PutAbilities } from "src/global/rbac/roles.decorators";
import { Action } from "src/shared/types/roles";

/**
 * @module OrganizationController
 * @description
 * This controller is responsible for handling requests related to organizations.
 * It provides endpoints for creating, retrieving, updating, and deleting organizations.
 */
@Controller('organization')
export class OrganizationController {
	/**
	 * Constructor for the OrganizationController.
	 * 
	 * @param organizationService - The service for managing organizations.
	 */
	constructor(
		private readonly organizationService: OrganizationService,
		
	) {}
	/**
	 * Create organization endpoint
	 * @returns The organization created
	 */
	@Post('create')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Create, subject: 'Organization' })
	async create(@Body() createOrganizationDto: CreateOrganizationDto) {
		try {
			return await this.organizationService.create(createOrganizationDto);
		} catch (error: any) {
			return { error: error.message}
		}
	}

	/**
	 * Get organization endpoint
	 * @returns The organization retrieved
	 */
	@Get('get')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: 'Organization' })
	async get(@Body() { cnss }: { cnss: string }) {
		try {
			return await this.organizationService.get(cnss);
		} catch (error: any) {
			return { error: error.message }
		}
	}

	/**
	 * Update organization endpoint
	 * @returns The organization updated
	 */
	@Put('update')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Update, subject: 'Organization' })
	async update(cnss: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
		try {
			return await this.organizationService.update(cnss, updateOrganizationDto);
		} catch (error: any) {
			return { error: error.message }
		}
	}

	/**
	 * Delete organization endpoint
	 * @returns The organization deleted
	 */
	@Delete('delete')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Delete, subject: 'Organization' })
	async delete(@Body() { cnss }: { cnss: string }) {
		if (!cnss) {
			return { error: 'CNSS is required' }
		}
		try {
			return await this.organizationService.delete(cnss);
		} catch (error: any) {
			return { error: error.message }
		}
	}
}