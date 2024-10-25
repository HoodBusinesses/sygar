import { Injectable } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { AnimatorRepository, OrganizationRepository, ThemeRepository } from "./organization.repository";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { UserService } from "../user/user.service";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { CreateAnimaotorItemDto, CreateAnimatorDto } from "./dto/create-animator.dto";
import { Animator } from "./model/animator.model";
import { WorkingTime, WorkTimeLimit } from "./model/group.model";
import { UpdateUserDto } from "../user/dto/update-user.dto";

/**
 * @class OrganizationService
 * @description
 * This service class is responsible for managing organizations in the application.
 * It provides methods to create, retrieve, update, and delete organizations.
 * 
 * @remarks
 * The service uses the OrganizationRepository to interact with the database.
 */
@Injectable()
export class OrganizationService {
	/**
	 * Constructor for the OrganizationService class.
	 * 
	 * @param organizationRepository - The repository for organization data.
	 * @param userService - The service for user management.
	 */
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly userService: UserService,
	) {}

	/**
	 * Create a new organization.
	 * 
	 * @param createOrganizationDto - The data for creating the organization.
	 * @returns The created organization.
	 * @throws {Error} If the organization already exists.
	 */
	async create(createOrganizationDto: CreateOrganizationDto) {
		// check if the organization already exists
		const organization = await this.organizationRepository.findByCnss(createOrganizationDto.cnss);

		// Throw an error if the organization already exists
		if (organization) {
			throw new Error('organizationExists');
		}

		// Create the organization
		const createdOrganization = await this.organizationRepository.create(createOrganizationDto);
		
		// Return the created organization
		return createdOrganization;
	}

	/**
	 * Get an organization by CNSS.
	 * 
	 * @param cnss - The CNSS of the organization to retrieve.
	 * @returns The organization found.
	 * @throws {Error} If the organization does not exist.
	 */
	async get(cnss: string) {
		// Find the organization by CNSS
		const organization = await this.organizationRepository.findByCnss(cnss);
		
		// Throw an error if the organization does not exist
		if (!organization) {
			throw new Error('organizationDoesntExists');
		}
		
		// Return the organization found
		return organization;
	}

	/**
	 * Update an organization by CNSS.
	 * 
	 * @param cnss - The CNSS of the organization to update.
	 * @param updateOrganizationDto - The data for updating the organization.
	 * @returns The updated organization.
	 * @throws {Error} If the organization does not exist.
	 */
	async update(cnss: string, updateOrganizationDto: UpdateOrganizationDto) {
		return this.organizationRepository.updateOrganization(cnss, updateOrganizationDto);
	}

	/**
	 * Delete an organization by CNSS.
	 * 
	 * @param cnss - The CNSS of the organization to delete.
	 * @returns The deleted organization.
	 * @throws {Error} If the organization does not exist.
	 */
	async delete(cnss: string) {
		// Throw an error if the CNSS is not provided
		if (!cnss) {
			throw new Error('cnssRequired');
		}
		
		// Find the organization by CNSS
		const organization = await this.organizationRepository.findByCnss(cnss);
		
		// Throw an error if the organization does not exist
		if (!organization) {
			throw new Error('organizationDoesntExists');
		}

		// Erase all users in the organization
		await this.userService.eraseAllUsersInOrganization(organization.cnss);

		// Delete the organization
		return this.organizationRepository.deleteOrganization(cnss);
	}
}

@Injectable()
export class ThemeService {
	constructor(
		private readonly themeRepository: ThemeRepository,
		private readonly organizationRepository: OrganizationRepository,
	) {}
	/**
	 * Create a new theme.
	 * 
	 * @param createThemeDto - The data for creating the theme.
	 * @returns The created theme.
	 */
	async createTheme(createThemeDto: CreateThemeDto) {
		if (createThemeDto.startDate > createThemeDto.endDate) {
			throw new Error('invalidDates');
		}

		// Find the organization by organizationId
		const organization = await this.organizationRepository.findByCnss(createThemeDto.organizationId);

		// Throw an error if the organization does not exist
		if (!organization) {
			throw new Error('organizationDoesntExists');
		}

		return await this.themeRepository.createTheme(createThemeDto);
	}

	/**
	 * Get a theme by UID.
	 * 
	 * @param uid - The UID of the theme to retrieve.
	 * @returns The theme found.
	 */
	async getTheme(uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}

		const theme = await this.themeRepository.findThemeByUid(uid);		

		if (!theme) {
			throw new Error('themeDoesntExists');
		}

		return theme;
	}

	/**
	 * Update a theme by UID.
	 * 
	 * @param uid - The UID of the theme to update.
	 * @param updateThemeDto - The data for updating the theme.
	 * @returns The updated theme.
	 */
	async updateTheme(uid: string, updateThemeDto: UpdateThemeDto) {
		const theme = await this.themeRepository.findThemeByUid(uid);

		if (!theme) {
			throw new Error('themeDoesntExists');
		}

		if (updateThemeDto.startDate && !updateThemeDto.endDate && updateThemeDto.startDate > theme.endDate) {
			throw new Error('invalidDates');
		}
		else if (updateThemeDto.endDate && !updateThemeDto.startDate && updateThemeDto.endDate < theme.startDate) {
			throw new Error('invalidDates');
		}
		else if (updateThemeDto.startDate && updateThemeDto.endDate && updateThemeDto.startDate > updateThemeDto.endDate) {
			throw new Error('invalidDates');
		}

		return this.themeRepository.updateTheme(uid, updateThemeDto);
	}

	/**
	 * Delete a theme by UID.
	 * 
	 * @param uid - The UID of the theme to delete.
	 * @returns The deleted theme.
	 */
	async deleteTheme(uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}

		const theme = await this.themeRepository.findThemeByUid(uid);

		if (!theme) {
			throw new Error('themeDoesntExists');
		}

		return this.themeRepository.deleteTheme(uid);
	}
}

@Injectable()
export class AnimatorService {
	constructor(
		private readonly animatorRepository: AnimatorRepository,
	) {}
	private convertToNumber(dateString: string): number {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			throw new Error('Invalid date string');
		}
		return date.getTime();
	}
	async createAnimator(createAnimatorDto: CreateAnimatorDto) {
		console.debug('Start invalid endpoint');
		const animator = await this.animatorRepository.getByEmail(createAnimatorDto.email);
		console.debug('End invalid endpoint', animator);

		if (!animator) throw new Error('Animator already exist with this email!');

		if (animator.workingHours && Array.isArray(animator.workingHours)) {
			for (let i = 0; i < animator.workingHours.length; i++) {
				const workingHour = animator.workingHours[i];
				// Check if workingHour is undefined or if startTime or endTime is undefined
				if (!workingHour || workingHour.startTime === undefined || workingHour.endTime === undefined) {
					// Remove the invalid workingHour from the array
					animator.workingHours.splice(i, 1);
					// Adjust index after removal to avoid skipping the next element
					i--;
					continue;
				}
				
				// Validate the working hours to ensure they are within the allowed limits
				if (!(workingHour.startTime < workingHour.endTime && workingHour.startTime >= WorkTimeLimit.MINSTART && workingHour.endTime <= WorkTimeLimit.MAXEND)) {
					throw new Error('Invalid Dates: minTime: ' + WorkTimeLimit.MINSTART + ' <= working startTime < endTime <= ' + WorkTimeLimit.MAXEND);
				}
			}
		}
		const workingHours: WorkingTime[] = createAnimatorDto.workingHours;
		const animatorItem: CreateAnimaotorItemDto = {
			name: createAnimatorDto.name,
			email: createAnimatorDto.email
		};

		console.debug('workingHours', workingHours);
		return await this.animatorRepository.createAnimator(animatorItem); 
	}

	async getAnimator(email: string): Promise<Animator> {
		if (!email)
			throw new Error('emailRequired');
		const animator: Animator | null = await this.animatorRepository.getByEmail(email);
		if (!animator)
			throw new Error('There is no animator with the email being given!');
		return animator;
	}

	async updateTheme(email: string, updateAnimatorDto: UpdateUserDto) {
		if (!email)
			throw new Error('emailRequired');
		else if (updateAnimatorDto.email && updateAnimatorDto.email != email && await this.animatorRepository.getByEmail(email))
			throw new Error('thisEmailAlreadyUsed');
		await this.animatorRepository.updateAnimator(email, updateAnimatorDto);
	}
}
