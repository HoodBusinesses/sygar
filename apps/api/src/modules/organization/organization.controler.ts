import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/global/auth/auth.guard";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { DeleteOrganizationDto } from "./dto/delete-organization-dtro";
import { AnimatorService, AssigningGroupService, FormatorService, GroupService, OrganizationService, ParticipantService, ThemeService } from "./organization.service";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { AbilitiesGuard } from "src/global/rbac/rbac.guard";
import { PutAbilities } from "src/global/rbac/roles.decorators";
import { Action } from "src/shared/types/roles";
import { GroupRepository, OrganizationRepository, ThemeRepository } from "./organization.repository";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageService } from "src/global/language/language.service";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { CreateAnimatorDto } from "./dto/create-animator.dto";
import { UpdateAnimatorDto } from "./dto/update-animator.dto";
import { CreateFormatorDto } from "./dto/create-formator.dto";
import { UpdateFormatorDto } from "./dto/update-formator.dto";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { EnrolledType } from "./model/group.model";
import { AssignToGroupDto } from "./dto/assign-group.dto";

/**
 * @module OrganizationController
 * @description
 * This controller is responsible for handling requests related to organizations.
 * It provides endpoints for creating, retrieving, updating, and deleting organizations.
 */
@ApiTags('organization')
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
	@ApiOperation({ summary: 'Create a new organization.' })
	@ApiResponse({ 
		status: 201, 
		description: 'Organization created successfully.', 
		schema: {
			example: {
				orgamization: {
					cnss: '123456789',
					name: 'My Organization',
					freeTrial: 30
				},
				date: new Date().toISOString()
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async create(@Body() createOrganizationDto: CreateOrganizationDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers; // Changed object to Record<string, any>
		const lang = header['accept-language'] ?? 'en'; // Get the language from the request headers or default to 'en'

		try {
			return {
				organization:
				await this.organizationService.create(createOrganizationDto),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }, 400);
		}
	}

	/**
	 * Get organization endpoint
	 * @returns The organization retrieved
	 */
	@Get('get')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: 'Organization' })
	@ApiOperation({ summary: 'Get an organization by CNSS.' })
	@ApiResponse({ 
		status: 200, 
		description: 'Organization retrieved successfully.', 
		schema: {
			example: {
				organization: {
					cnss: '123456789',
					name: 'My Organization',
					freeTrial: 30
				},
				date: new Date().toISOString()
			}
		}
	})
	@ApiResponse({ status: 404, description: 'Organization not found.' })
	async get(@Query("cnss") cnss: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			if (!cnss)
				throw Error('cnssRequired');
			return {
				organization:
					await this.organizationService.get(cnss),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }, 404);
		}
	}

	/**
	 * Update organization endpoint
	 * @returns The organization updated
	 */
	@Put('update')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Update, subject: 'Organization' })
	@ApiOperation({ summary: 'Update an organization by CNSS.' })
	@ApiResponse({
		status: 200,
		description: 'Organization updated successfully.',
		schema: {
			example: {
				organization: {
					cnss: '123456789',
					name: 'My Organization',
					freeTrial: 30
				},
				date: new Date().toISOString()
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async update(cnss: string, @Body() updateOrganizationDto: UpdateOrganizationDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';
		try {
			return {
				organization:
				await this.organizationService.update(cnss, updateOrganizationDto),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }, 400);
		}
	}

	/**
	 * Delete organization endpoint
	 * @returns The organization deleted
	 */
	@Delete('delete')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Delete, subject: 'Organization' })
	@ApiOperation({ summary: 'Delete an organization by CNSS.' })
	@ApiResponse({
		status: 200,
		description: 'Organization deleted successfully.',
		schema: {
			example: {
				success: "organization deleted successfully",
				date: new Date().toISOString()
			}
		}
	})
	@ApiResponse({ status: 404, description: 'Organization not found.' })
	async delete(@Body() deleteOrganizationDto: DeleteOrganizationDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				success: await this.organizationService.delete(deleteOrganizationDto.cnss),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }, 404);
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
			example: {
				organizations: [
					{
						cnss: '123456789',
						name: 'My Organization',
						freeTrial: 30
					}
				],
				date: new Date().toISOString()
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request due to invalid parameters.' })
	@ApiResponse({ status: 404, description: 'No organizations found for the given filters.' })
	async getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name?: string, @Query('year') year?: number) {
		try {
			const organizations = await this.organizationRepository.getAll(page, limit, name, year);
			return { organizations, date: new Date().toISOString() };
		} catch (error: any) {
			// return { error: error.message, date: new Date().toISOString() }
			throw new HttpException({ error: error.message, date: new Date().toISOString() }, 400);
		}
	}
}

/**
 * @module ThemeController
 * @description
 * This controller is responsible for handling requests related to themes.
 * It provides endpoints for creating, retrieving, updating, and deleting themes.
 */
@ApiTags('theme')
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
		private readonly themeService: ThemeService,
		private readonly themeRepository: ThemeRepository,
		private readonly languageService: LanguageService,
	) {}

	/**
	 * Create theme endpoint
	 * 
	 * @param createThemeDto - The DTO for creating a new theme
	 * @returns The theme created
	 */
	@Post('create')
	@PutAbilities({ action: Action.Create, subject: 'Theme' })
	@UseGuards(JwtGuard, AbilitiesGuard)
	@ApiOperation({ summary: 'Create a new theme.' })
	@ApiResponse({
		status: 201,
		description: 'Theme created successfully.',
		schema: {
			example: {
				theme: {
					createdAt: 1633392000000,
					updatedAt: 1633392000000,
					name: 'My Theme',
					cost: 100,
					groups: [
						{
							interfacePending: true,
						}
					],
					description: 'My theme description',
					organizationId: '123456789',
					startDate: 1633392000000,
					endDate: 1633392000000,
					uid: 'theme-123',
					PK: 'THEME#theme-123',
					SK: 'THEME#theme-123'
				},
				date: new Date().toISOString()
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async create(@Body() createThemeDto: CreateThemeDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers; // Get the headers from the request
		const lang = header['accept-language'] ?? 'en'; // Get the language from the request headers or default to 'en'
		try {
			return {
				theme:
					await this.themeService.createTheme(createThemeDto), // Create the theme
				date: new Date().toISOString() // Return the date
			};
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }, 400);
		}
	}

	/**
	 * Get theme endpoint
	 * @param uid - The UID of the theme to retrieve
	 * @returns The theme retrieved
	 */
	@Get('get')
	@PutAbilities({ action: Action.Read, subject: 'Theme' })
	@UseGuards(JwtGuard, AbilitiesGuard)
	@ApiOperation({ summary: 'Get a theme by UID.' })
	@ApiResponse({
		status: 200,
		description: 'Theme retrieved successfully.',
		schema: {
			example: {
				theme: {
					createdAt: 1633392000000,
					updatedAt: 1633392000000,
					name: 'My Theme',
					cost: 100,
					groups: [
						{
							interfacePending: true,
						}
					],
					description: 'My theme description',
					organizationId: '123456789',
					startDate: 1633392000000,
					endDate: 1633392000000,
					uid: 'theme-123',
					PK: 'THEME#theme-123',
					SK: 'THEME#theme-123'
				},
				date: new Date().toISOString()
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async get(@Query("uid") uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			if (!uid)
				throw new Error('uidRequired');
			return {
				theme:
					await this.themeService.getTheme(uid),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }, 400);
		}
	}

	/**
	 * Update theme endpoint
	 * 
	 * @param uid - The UID of the theme to update
	 * @param updateThemeDto - The DTO for updating the theme
	 * @returns The theme updated
	 */
	@Put('update')
	@PutAbilities({ action: Action.Update, subject: 'Theme' })
	@UseGuards(JwtGuard, AbilitiesGuard)
	@ApiOperation({ summary: 'Update a theme by UID.' })
	@ApiResponse({
		status: 200,
		description: 'Theme updated successfully.',
		schema: {
			example: {
				theme: {
					createdAt: 1633392000000,
					updatedAt: 1633392000000,
					name: 'My Theme',
					cost: 100,
					groups: [
						{
							interfacePending: true,
						}
					],
					description: 'My theme description',
					organizationId: '123456789',
					startDate: 1633392000000,
					endDate: 1633392000000,
					uid: 'theme-123',
					PK: 'THEME#theme-123',
					SK: 'THEME#theme-123'
				},
				date: new Date().toISOString()
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async update(@Query	("uid") uid: string, @Body() updateThemeDto: UpdateThemeDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';
		try {
			return {
				theme:
					await this.themeService.updateTheme(uid, updateThemeDto),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }, 400);
		}
	}

	/**
	 * Delete theme endpoint
	 * @param uid - The UID of the theme to delete
	 * @returns The theme deleted
	 */
	@Delete('delete')
	@PutAbilities({ action: Action.Delete, subject: 'Theme' })
	@UseGuards(JwtGuard, AbilitiesGuard)
	@ApiOperation({ summary: 'Delete a theme by UID.' })
	@ApiResponse({
		status: 200,
		description: 'Theme deleted successfully.',
		schema: {
			example: {
				success: "theme deleted successfully",
				date: new Date().toISOString()
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async delete(@Query("uid") uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				success: await this.themeService.deleteTheme(uid),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }, 400);
		}
	}

	/**
	 * Get all themes endpoint
	 * @param page - The page number to retrieve (default is 1)
	 * @param limit - The number of themes to return per page (default is 10)
	 * @param name - Optional filter to search themes by name
	 * @param year - Optional filter to search themes by year
	 * @returns The themes retrieved
	 */
	@Get('get-all')
	@PutAbilities({ action: Action.Read, subject: 'Theme' })
	@UseGuards(JwtGuard, AbilitiesGuard)
	@ApiOperation({ summary: 'Get all themes.' })
	@ApiResponse({ status: 200, description: 'All themes retrieved successfully.',
		schema: {
			example: {
				themes: [
					{
						createdAt: 1633392000000,
						updatedAt: 1633392000000,
						name: 'My Theme',
						cost: 100,
						groups: [
							{
								interfacePending: true,
							}
						],
						description: 'My theme description',
						organizationId: '123456789',
						startDate: 1633392000000,
						endDate: 1633392000000,
						uid: 'theme-123',
						PK: 'THEME#theme-123',
						SK: 'THEME#theme-123'
					}
				],
				date: new Date().toISOString()
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async getAll(@Req() req: Request, @Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name?: string, @Query('year') year?: number) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';
		try {
			const themes = await this.themeRepository.getAllThemes(page, limit, name, year);
			return { themes, date: new Date().toISOString() };
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString() }, HttpStatus.BAD_REQUEST);
		}
	}
}

/**
 * @module GroupController
 * @description
 * This controller is responsible for handling requests related to groups.
 * It provides endpoints for creating, retrieving, updating, and deleting groups.
 */
@ApiTags('group')
@Controller('group')
export class GroupController {
	/**
	 * Constructor for the GroupController class.
	 * 
	 * @param groupService - The service for group management.
	 * @param languageService - The service for language management.
	 */
	constructor(
		private readonly groupService: GroupService,
		private readonly languageService: LanguageService,
	) {}

	/**
	 * Create group endpoint
	 * @param createGroupDto - The DTO for creating a new group
	 * @param req - The request object
	 * @returns The group created
	 */
	@Post('create')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Create, subject: 'Theme' })
	@ApiOperation({ summary: 'Create a new group.' })
	@ApiResponse({ status: 201, description: 'Group created successfully.',
		schema: {
			example: {
				PK: 'GROUP#group-123',
				SK: 'GROUP#group-123',
				uid: 'group-123',
				themeId: 'theme-123',
				theme: 'My Theme',
				location: 'Location',
				action: 'Planned',
				startDate: 1633392000000,
				endDate: 1633392000000,
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async createGroup(@Body() createGroupDto: CreateGroupDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				// Create the group and return it
				group: await this.groupService.createGroup(createGroupDto),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Get group endpoint
	 * @param uid - The UID of the group to retrieve
	 * @param req - The request object
	 * @returns The group retrieved
	 */
	@Get('get')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: 'Theme' })
	@ApiOperation({ summary: 'Get a group by UID.' })
	@ApiResponse({ status: 200, description: 'Group retrieved successfully.',
		schema: {
			example: {
				PK: 'GROUP#group-123',
				SK: 'GROUP#group-123',
				uid: 'group-123',
				themeId: 'theme-123',
				theme: 'My Theme',
				location: 'Location',
				action: 'Planned',
				startDate: 1633392000000,
				endDate: 1633392000000,
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async get(@Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				group: await this.groupService.getGroup(uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Update group endpoint
	 * @param updateGroupDto - The DTO for updating the group
	 * @param uid - The UID of the group to update
	 * @param req - The request object
	 * @returns The group updated
	 */
	@Put('update')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Update, subject: 'Theme' })
	@ApiOperation({ summary: 'Update a group by UID.' })
	@ApiResponse({ status: 200, description: 'Group updated successfully.',
		schema: {
			example: {
				PK: 'GROUP#group-123',
				SK: 'GROUP#group-123',
				uid: 'group-123',
				themeId: 'theme-123',
				theme: 'My Theme',
				location: 'Location',
				action: 'Planned',
				startDate: 1633392000000,
				endDate: 1633392000000,
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async updateGroup(@Body() updateGroupDto: UpdateGroupDto, @Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				group: await this.groupService.updateGroup(uid, updateGroupDto),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Delete group endpoint
	 * @param uid - The UID of the group to delete
	 * @param req - The request object
	 * @returns The group deleted
	 */
	@Delete('delete')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Delete, subject: 'Theme' })
	@ApiOperation({ summary: 'Delete a group by UID.' })
	@ApiResponse({ status: 200, description: 'Group deleted successfully.',
		schema: {
			example: {
				message: 'Group deleted successfully',
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async deleteGroup(@Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';
		console.log(uid);
		try {
			return {
				...await this.groupService.deleteGroup(uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}


}

/**
 * @module AnimatorController
 * @description
 * This controller is responsible for handling requests related to animators.
 * It provides endpoints for creating, retrieving, updating, and deleting animators.
 */
@ApiTags('animator')
@Controller('animator')
export class AnimatorController {
	/**
	 * Constructor for the AnimatorController class.
	 * 
	 * @param languageService - The service for language management.
	 * @param animatorService - The service for animator management.
	 */
	constructor(
		private readonly languageService: LanguageService,
		private readonly animatorService: AnimatorService,
	) {};

	/**
	 * Create animator endpoint
	 * @param createAnimatorDto - The data for creating the animator.
	 * @param req - The request object.
	 * @returns The animator created
	 */
	@Post('create')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Create, subject: 'Theme' })
	@ApiOperation({ summary: 'Create a new animator.' })
	@ApiResponse({ status: 201, description: 'Animator created successfully.',
		schema: {
			example: {
				animator: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					firstName: 'John',
					lastName: 'Doe',
					name: 'John Doe',
					email: 'john.doe@example.com',
					organizationId: '123456789',
					createdAt: 1725000000,
					updatedAt: 1725000000,
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async createAnimator(@Body() createAnimatorDto: CreateAnimatorDto, @Req() req: Request) {
		// Get the language from the request header
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				// Create the animator and return it
				animator: await this.animatorService.createAnimator(createAnimatorDto),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Get animator endpoint
	 * @param uid - The UID of the animator to retrieve.
	 * @param req - The request object.
	 * @returns The animator retrieved
	 */
	@Get('get')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: 'Theme' })
	@ApiOperation({ summary: 'Get an animator by UID.' })
	@ApiResponse({ status: 200, description: 'Animator retrieved successfully.',
		schema: {
			example: {
				animator: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					firstName: 'John',
					lastName: 'Doe',
					name: 'John Doe',
					email: 'john.doe@example.com',
					organizationId: '123456789',
					createdAt: 1725000000,
					updatedAt: 1725000000,
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async get(@Query('uid') uid: string, @Req() req: Request) {
		// Get the language from the request header
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				// Get the animator by UID and return it
				animator: await this.animatorService.getAnimator(uid),
				date: new Date().toISOString(),
			};
		} catch (error: any){
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		} 
	}

	/**
	 * Update animator endpoint
	 * @param updateAnimatorDto - The data for updating the animator.
	 * @param uid - The UID of the animator to update.
	 * @param req - The request object.
	 * @returns The animator updated
	 */
	@Put('update')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Update, subject: 'Theme' })
	@ApiOperation({ summary: 'Update an animator by UID.' })
	@ApiResponse({ status: 200, description: 'Animator updated successfully.',
		schema: {
			example: {
				animator: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					firstName: 'John',
					lastName: 'Doe',
					name: 'John Doe',
					email: 'john.doe@example.com',
					organizationId: '123456789',
					createdAt: 1725000000,
					updatedAt: 1725000000,
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async update(@Body() updateAnimatorDto: UpdateAnimatorDto, @Query('uid') uid: string, @Req() req: Request) {
		// Get the language from the request header
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				// Update the animator and return it
				animator: await this.animatorService.updateAnimator(updateAnimatorDto, uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Delete animator endpoint
	 * @param uid - The UID of the animator to delete.
	 * @param req - The request object.
	 * @returns The animator deleted
	 */
	@Delete('delete')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Delete, subject: 'Theme' })
	@ApiOperation({ summary: 'Delete an animator by UID.' })
	@ApiResponse({ status: 200, description: 'Animator deleted successfully.',
		schema: {
			example: {
				message: 'Animator deleted successfully',
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async deleteAnimator(@Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				...await this.animatorService.deleteAnimator(uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}
}

/**
 * @module FormatorController
 * @description
 * This controller is responsible for handling requests related to formators.
 * It provides endpoints for creating, retrieving, updating, and deleting formators.
 */
@ApiTags('formator')
@Controller('formator')
export class FormatorController {
	/**
	 * Constructor for the FormatorController class.
	 * 
	 * @param languageService - The service for language management.
	 * @param formatorService - The service for formator management.
	 */
	constructor(
		private readonly languageService: LanguageService,
		private readonly formatorService: FormatorService,
	) {}

	/**
	 * Create formator endpoint
	 * @param createFormatorDto - The data for creating the formator.
	 * @param req - The request object.
	 * @returns The formator created
	 */
	@Post('create')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Create, subject: 'Theme' })
	@ApiOperation({ summary: 'Create a new formator.' })
	@ApiResponse({ status: 201, description: 'Formator created successfully.',
		schema: {
			example: {
				formator: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					organizationId: '123456789',
					createdAt: 1725000000,
					updatedAt: 1725000000,
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async createFormator(@Body() createFormatorDto: CreateFormatorDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				// Create the formator and return it
				formator: await this.formatorService.createFormator(createFormatorDto),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Get formator endpoint
	 * @param uid - The UID of the formator to retrieve.
	 * @param req - The request object.
	 * @returns The formator retrieved
	 */
	@Get('get')
	@ApiOperation({ summary: 'Get a formator by UID.' })
	@ApiResponse({ status: 200, description: 'Formator retrieved successfully.',
		schema: {
			example: {
				formator: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					organizationId: '123456789',
					createdAt: 1725000000,
					updatedAt: 1725000000,
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async get(@Query('uid') uid: string, @Req() req: Request) {
		const header:Record<string, any> = req.headers;
		const lang: string = header['accept-language'] ?? 'en';

		try {
			return {
				// Get the formator by UID and return it
				formator: await this.formatorService.getByUid(uid),
				date: new Date().toISOString(),
			};
		} catch (error: any){
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		} 
	}

	/**
	 * Update formator endpoint
	 * @param updateFormatorDto - The data for updating the formator.
	 * @param uid - The UID of the formator to update.
	 * @param req - The request object.
	 * @returns The formator updated
	 */
	@Put('update')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Update, subject: 'Theme' })
	@ApiOperation({ summary: 'Update a formator by UID.' })
	@ApiResponse({ status: 200, description: 'Formator updated successfully.',
		schema: {
			example: {
				formator: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					organizationId: '123456789',
					createdAt: 1725000000,
					updatedAt: 1725000000,
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async updateFormator(@Body() updateFormatorDto: UpdateFormatorDto, @Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				// Update the formator and return it
				formator: await this.formatorService.updateFormator(updateFormatorDto, uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Delete formator endpoint
	 * @param uid - The UID of the formator to delete.
	 * @param req - The request object.
	 * @returns The formator deleted
	 */
	@Delete('delete')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Delete, subject: 'Theme' })
	@ApiOperation({ summary: 'Delete a formator by UID.' })
	@ApiResponse({ status: 200, description: 'Formator deleted successfully.',
		schema: {
			example: {
				success: "Formator deleted successfully.",
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async deleteFormator(@Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				...await this.formatorService.deleteFormator(uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}
}

/**
 * @module ParticipantController
 * @description
 * This controller is responsible for handling requests related to participants.
 * It provides endpoints for creating, retrieving, updating, and deleting participants.
 */
@ApiTags('participant')
@Controller('participant')
export class ParticipantController {
	/**
	 * Constructor for the ParticipantController class.
	 * 
	 * @param languageService - The service for language management.
	 * @param participantService - The service for participant management.
	 */
	constructor(
		private readonly languageService: LanguageService,
		private readonly participantService: ParticipantService,
	) {}

	/**
	 * Create participant endpoint
	 * @param createParticipantDto - The data for creating the participant.
	 * @param req - The request object.
	 * @returns The participant created
	 */
	@Post('create')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Create, subject: 'Theme' })
	@ApiOperation({ summary: 'Create a new participant.' })
	@ApiResponse({ status: 201, description: 'Participant created successfully.',
		schema: {
			example: {
				participant: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					cnss: '123456789',
					status: 'active',
					organizationId: '123456789',
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async createParticipant(@Body() createParticipantDto: CreateParticipantDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				// Create the participant and return it
				participant: await this.participantService.createParticipant(createParticipantDto),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Get participant endpoint
	 * @param uid - The UID of the participant to retrieve.
	 * @param req - The request object.
	 * @returns The participant retrieved
	 */
	@Get('get')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: 'Theme' })
	@ApiOperation({ summary: 'Get a participant by UID.' })
	@ApiResponse({ status: 200, description: 'Participant retrieved successfully.',
		schema: {
			example: {
				participant: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					cnss: '123456789',
					status: 'active',
					organizationId: '123456789',
					createdAt: 1725000000,
					updatedAt: 1725000000,
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async getParticipant(@Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				participant: await this.participantService.getParticipant(uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Update participant endpoint
	 * @param updateParticipantDto - The data for updating the participant.
	 * @param uid - The UID of the participant to update.
	 * @param req - The request object.
	 * @returns The participant updated
	 */
	@Put('update')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Update, subject: 'Theme' })
	@ApiOperation({ summary: 'Update a participant by UID.' })
	@ApiResponse({ status: 200, description: 'Participant updated successfully.',
		schema: {
			example: {
				participant: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					cnss: '123456789',
					status: 'active',
					organizationId: '123456789',
					createdAt: 1725000000,
					updatedAt: 1725000000,
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async updateParticipant(@Body() updateParticipantDto: UpdateParticipantDto, @Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				participant: await this.participantService.updateParticipant(updateParticipantDto, uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Delete participant endpoint
	 * @param uid - The UID of the participant to delete.
	 * @param req - The request object.
	 * @returns The participant deleted
	 */
	@Delete('delete')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Delete, subject: 'Theme' })
	@ApiOperation({ summary: 'Delete a participant by UID.' })
	@ApiResponse({ status: 200, description: 'Participant deleted successfully.',
		schema: {
			example: {
				success: "Participant deleted successfully.",
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async deleteParticipant(@Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				...await this.participantService.deleteParticipant(uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}
}

/**
 * @module AssigningGroupController
 * @description
 * This controller is responsible for handling requests related to assigning groups.
 */
@ApiTags('assigning-group')
@Controller('assigning-group')
export class AssigningGroupController {
	/**
	 * Constructor for the AssigningGroupController class.
	 * 
	 * @param languageService - The service for language management.
	 * @param assigningGroupService - The service for assigning group management.
	 */
	constructor(
		private readonly languageService: LanguageService,
		private readonly assigningGroupService: AssigningGroupService,
	) {}

	/**
	 * Create assigning group endpoint
	 * @param assignToGroupDto - The data for creating the assigning group.
	 * @param req - The request object.
	 * @returns The assigning group created
	 */
	@Post('create')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Create, subject: 'Theme' })
	@ApiOperation({ summary: 'Create a new assigning group.' })
	@ApiResponse({ status: 201, description: 'Assigning group created successfully.',
		schema: {
			example: {
				assigningGroup: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					enrolledUid: '123456789',
					enrolledType: 'Participant',
					groupUid: '123456789',
					themeId: '123456789',
					organizationId: '123456789',
					startDate: 1725000000,
					endDate: 1725000000,
					createdAt: 1725000000,
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async createAssigningGroup(@Body() assignToGroupDto: AssignToGroupDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				assigningGroup: await this.assigningGroupService.createAssigningGroup(assignToGroupDto),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Get assigning group endpoint
	 * @param uid - The UID of the assigning group to retrieve.
	 * @param req - The request object.
	 * @returns The assigning group retrieved
	 */
	@Get('get')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: 'Theme' })
	@ApiOperation({ summary: 'Get an assigning group by UID.' })
	@ApiResponse({ status: 200, description: 'Assigning group retrieved successfully.',
		schema: {
			example: {
				assigningGroup: {
					PK: '123456789',
					SK: '123456789',
					uid: '123456789',
					enrolledUid: '123456789',
					enrolledType: 'Participant',
					groupUid: '123456789',
					themeId: '123456789',
					organizationId: '123456789',
					startDate: 1725000000,
					endDate: 1725000000,
					createdAt: 1725000000,
				},
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async getAssigningGroup(@Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				assigningGroup: await this.assigningGroupService.getByUid(uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Get assigning groups by enrolled UID and type endpoint
	 * @param enrolledUid - The UID of the enrolled to retrieve.
	 * @param enrolledType - The type of the enrolled.
	 * @param req - The request object.
	 * @returns The assigning groups retrieved
	 */
	@Get('get-by-enrolleds')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: 'Theme' })
	@ApiOperation({ summary: 'Get assigning groups by enrolled UID and type.' })
	@ApiResponse({ status: 200, description: 'Assigning groups retrieved successfully.',
		schema: {
			example: {
				assigningGroups: [
					{
						PK: '123456789',
						SK: '123456789',
						uid: '123456789',
						enrolledUid: '123456789',
						enrolledType: 'Participant',
						groupUid: '123456789',
						themeId: '123456789',
						organizationId: '123456789',
						startDate: 1725000000,
						endDate: 1725000000,
						createdAt: 1725000000,
					}
				],
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async getByEnrolleds(@Query('enrolledUid') enrolledUid: string, @Query('enrolledType') enrolledType: EnrolledType, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				assigningGroups: await this.assigningGroupService.getByEnrolleds(enrolledUid, enrolledType),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Get assigning groups by group UID endpoint
	 * @param groupUid - The UID of the group to retrieve.
	 * @param enrolledType - The type of the enrolled.
	 * @param req - The request object.
	 * @returns The assigning groups retrieved
	 */
	@Get('get-by-group-uid')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Read, subject: 'Theme' })
	@ApiOperation({ summary: 'Get assigning groups by group UID.' })
	@ApiResponse({ status: 200, description: 'Assigning groups retrieved successfully.',
		schema: {
			example: {
				assigningGroups: [
					{
						PK: '123456789',
						SK: '123456789',
						uid: '123456789',
						enrolledUid: '123456789',
						enrolledType: 'Participant',
						groupUid: '123456789',
						themeId: '123456789',
						organizationId: '123456789',
						startDate: 1725000000,
						endDate: 1725000000,
						createdAt: 1725000000,
					}
				],
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async getByGroupUid(@Query('groupUid') groupUid: string, @Query('enrolledType') enrolledType: EnrolledType, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';
		try {
			return {
				assigningGroups: await this.assigningGroupService.getByGroupUid(groupUid, enrolledType),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Delete assigning group endpoint
	 * @param uid - The UID of the assigning group to delete.
	 * @param req - The request object.
	 * @returns The assigning group deleted
	 */
	@Delete('delete')
	@UseGuards(JwtGuard, AbilitiesGuard)
	@PutAbilities({ action: Action.Delete, subject: 'Theme' })
	@ApiOperation({ summary: 'Delete an assigning group by UID.' })
	@ApiResponse({ status: 200, description: 'Assigning group deleted successfully.',
		schema: {
			example: {
				success: "Assigning group deleted successfully.",
				date: new Date().toISOString(),
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	async deleteAssigningGroup(@Query('uid') uid: string, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				success: await this.assigningGroupService.deleteAssigningGroup(uid),
				date: new Date().toISOString(),
			}
		} catch (error: any) {
			throw new HttpException({ error: this.languageService.getTranslation(error.message, lang), date: new Date().toISOString()}, HttpStatus.BAD_REQUEST);
		}
	}
}
