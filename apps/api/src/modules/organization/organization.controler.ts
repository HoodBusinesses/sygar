import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/global/auth/auth.guard";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { DeleteOrganizationDto } from "./dto/delete-organization-dtro";
import { OrganizationService } from "./organization.service";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { AbilitiesGuard } from "src/global/rbac/rbac.guard";
import { PutAbilities } from "src/global/rbac/roles.decorators";
import { Action } from "src/shared/types/roles";
import { OrganizationRepository } from "./organization.repository";
import { ApiResponse } from '@nestjs/swagger';
import { LanguageService } from "src/global/language/language.service";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";

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
		private readonly languageService: LanguageService,
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
	async create(@Body() createOrganizationDto: CreateOrganizationDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers; // Changed object to Record<string, any>
		let lang = header['accept-language'] ?? 'en'; // Get the language from the request headers or default to 'en'

		try {
			return {
				organization:
				await this.organizationService.create(createOrganizationDto),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			return { error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }
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
	async get(@Query("cnss") cnss: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		let lang = header['accept-language'] ?? 'en';

		try {
			if (!cnss)
				throw Error('cnssRequired');
			return {
				organization:
					await this.organizationService.get(cnss),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			return { error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()};
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
	async update(cnss: string, @Body() updateOrganizationDto: UpdateOrganizationDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		let lang = header['accept-language'] ?? 'en';
		try {
			return {
				organization:
				await this.organizationService.update(cnss, updateOrganizationDto),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			return { error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }
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
	async delete(@Body() deleteOrganizationDto: DeleteOrganizationDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		let lang = header['accept-language'] ?? 'en';

		try {
			return {
				success: await this.organizationService.delete(deleteOrganizationDto.cnss),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			return { error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }
		}
	}

	/**
	 * Get all organizations endpoint
	 * 
	 * This endpoint retrieves a paginated list of organizations. 
	 * You can filter the results by name and year. 
	 * If no filters are provided, it returns the first page of organizations with a default limit of 10.
	 * 
	 * @param page - The page number to retrieve (default is 1).
	 * @param limit - The number of organizations to return per page (default is 10).
	 * @param name - Optional filter to search organizations by name.
	 * @param year - Optional filter to search organizations by year.
	 * @returns A list of organizations along with pagination information.
	 */
	@Get('get-all')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: "Organization"})
	@ApiResponse({ 
		status: 200, 
		description: 'All organizations retrieved successfully.', 
		schema: {
			example: [
				{
					cnss: '123456789',
					name: 'My Organization',
					freeTrial: 30
				},
				{
					cnss: '987654321',
					name: 'Another Organization',
					freeTrial: 15
				}
			]
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request due to invalid parameters.' })
	@ApiResponse({ status: 404, description: 'No organizations found for the given filters.' })
	async getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name?: string, @Query('year') year?: number) {
		try {
			const organizations = await this.organizationRepository.getAll(page, limit, name, year);
			return { organizations, date: new Date().toISOString() };
		} catch (error: any) {
			return { error: error.message, date: new Date().toISOString() }
		}
	}
}

/**
 * @module ThemeController
 * @description
 * This controller is responsible for handling requests related to themes.
 * It provides endpoints for creating, retrieving, updating, and deleting themes.
 */
@Controller('theme')
export class ThemeController {

	/**
	 * Constructor for the ThemeController.
	 * 
	 * @param organizationService - The service for managing organizations.
	 * @param organizationRepository - The repository for organization data.
	 * @param languageService - The service for managing languages.
	 */
	constructor(
		private readonly organizationService: OrganizationService,
		private readonly organizationRepository: OrganizationRepository,
		private readonly languageService: LanguageService,
	) {}

	/**
	 * Create theme endpoint
	 * @returns The theme created
	 */
	@Post('create')
	@UseGuards(JwtGuard, AbilitiesGuard)
	async create(@Body() createThemeDto: CreateThemeDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		let lang = header['accept-language'] ?? 'en';

		try {
			return {
				theme:
					await this.organizationService.createTheme(createThemeDto),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			return { error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }
		}
	}

	/**
	 * Get theme endpoint
	 * @returns The theme retrieved
	 */
	@Get('get')
	@UseGuards(JwtGuard, AbilitiesGuard)
	async get(@Query("uid") uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		let lang = header['accept-language'] ?? 'en';

		try {
			if (!uid)
				throw Error('uidRequired');
			return {
				theme:
					await this.organizationService.getTheme(uid),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			return { error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() };
		}
	}

	/**
	 * Update theme endpoint
	 * @returns The theme updated
	 */
	@Put('update')
	@UseGuards(JwtGuard, AbilitiesGuard)
	async update(@Query	("uid") uid: string, @Body() updateThemeDto: UpdateThemeDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		let lang = header['accept-language'] ?? 'en';
		try {
			return {
				theme:
					await this.organizationService.updateTheme(uid, updateThemeDto),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			return { error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }
		}
	}

	/**
	 * Delete theme endpoint
	 * @returns The theme deleted
	 */
	@Delete('delete')
	@UseGuards(JwtGuard, AbilitiesGuard)
	async delete(@Query("uid") uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		let lang = header['accept-language'] ?? 'en';

		try {
			return {
				success: await this.organizationService.deleteTheme(uid),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			return { error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }
		}
	}

	/**
	 * Get all themes endpoint
	 * @returns The themes retrieved
	 */
	@Get('get-all')
	@UseGuards(JwtGuard, AbilitiesGuard)
	async getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name?: string, @Query('year') year?: number) {
		try {
			const themes = await this.organizationRepository.getAllThemes(page, limit, name, year);
			return { themes, date: new Date().toISOString() };
		} catch (error: any) {
			return { error: error.message, date: new Date().toISOString() }
		}
	}
}

