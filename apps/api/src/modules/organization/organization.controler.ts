import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/global/auth/auth.guard";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { OrganizationService } from "./organization.service";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { AbilitiesGuard } from "src/global/rbac/rbac.guard";
import { PutAbilities } from "src/global/rbac/roles.decorators";
import { Action } from "src/shared/types/roles";
import { UserService } from "../user/user.service";
import { OrganizationRepository } from "./organization.repository";
import { ApiResponse } from '@nestjs/swagger';

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
		private readonly organizationRepository: OrganizationRepository,		
	) {}
	/**
	 * Create organization endpoint
	 * @returns The organization created
	 */
	@Post('create')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Create, subject: 'Organization' })
	@ApiResponse({ 
		status: 201, 
		description: 'Organization created successfully.', 
		schema: {
			example: {
				cnss: '123456789',
				name: 'My Organization',
				freeTrial: 30
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async create(@Body() createOrganizationDto: CreateOrganizationDto) {
		try {
			return await this.organizationService.create(createOrganizationDto);
		} catch (error: any) {
			return { error: error.message }
		}
	}

	/**
	 * Get organization endpoint
	 * @returns The organization retrieved
	 */
	@Get('get')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: 'Organization' })
	@ApiResponse({ 
		status: 200, 
		description: 'Organization retrieved successfully.', 
		schema: {
			example: {
				cnss: '123456789',
				name: 'My Organization',
				freeTrial: 30
			}
		}
	})
	@ApiResponse({ status: 404, description: 'Organization not found.' })
	async get(@Query("cnss") cnss: string) {
		try {
			if (!cnss)
				throw Error("cnss is required!");
			return await this.organizationService.get(cnss);
		} catch (error: any) {
			return { error: error.message };
		}
	}

	/**
	 * Update organization endpoint
	 * @returns The organization updated
	 */
	@Put('update')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Update, subject: 'Organization' })
	@ApiResponse({ status: 200, description: 'Organization updated successfully.' })
	@ApiResponse({ status: 400, description: 'Bad request.' })
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
	@ApiResponse({ status: 200, description: 'Organization deleted successfully.' })
	@ApiResponse({ status: 404, description: 'Organization not found.' })
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


	/**
	 * Get all organizations
	 */
	@Get('get-all')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: "Organization"})
	@ApiResponse({ status: 200, description: 'All organizations retrieved successfully.' })
	async getAll() {
		try {
			return await this.organizationRepository.getAll();
		} catch (error: any) {
			return { error: error.message }
		}
	}
}