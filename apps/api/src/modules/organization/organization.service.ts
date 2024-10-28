import { Injectable } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { AnimatorRepository, FormatorRepository, OrganizationRepository, ThemeRepository, WorkingHoursManager } from "./organization.repository";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { UserService } from "../user/user.service";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { CreateAnimatorDto, CreateAnimatorItemDto, UpdateAnimatorDto } from "./dto/create-animator.dto";
import { Animator } from "./model/animator.model";
import { CreateWorkingTimeDto, WorkTimeLimit } from "./model/group.model";
import { CreateFormatorDto, CreateFormatorItem, Formator } from "./model/formator.model";

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
		return await this.organizationRepository.updateOrganization(cnss, updateOrganizationDto);
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
		return await this.organizationRepository.deleteOrganization(cnss);
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

		return await this.themeRepository.updateTheme(uid, updateThemeDto);
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

		return await this.themeRepository.deleteTheme(uid);
	}
}

@Injectable()
export class AnimatorService {
	constructor(
		private readonly animatorRepository: AnimatorRepository,
		private readonly workingHoursManager: WorkingHoursManager,
	) {}
	private convertToNumber(dateString: string): number {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			throw new Error('Invalid date string');
		}
		return date.getTime();
	}
	async createAnimator(createAnimatorDto: CreateAnimatorDto) {
		const animator = await this.animatorRepository.getByEmail(createAnimatorDto.email);

		if (animator) throw new Error('Animator already exist with this email!');

		const workingHours: CreateWorkingTimeDto[] = createAnimatorDto.workingHours;
		
		await this.workingHoursManager.validateWorkingHours(workingHours, createAnimatorDto.email);

		const animatorItem: CreateAnimatorItemDto = {
			name: createAnimatorDto.name,
			email: createAnimatorDto.email,
			organizationId: createAnimatorDto.organizationId,
		};

		const newAnimator = await this.animatorRepository.createAnimator(animatorItem);
		
		await this.workingHoursManager.addWorkingHours(workingHours, createAnimatorDto.email);


		return { ...newAnimator, workingHours }; 
	}

	async getAnimator(email: string): Promise<Animator> {
		if (!email)
			throw new Error('emailRequired');
		const animator: Animator | null = await this.animatorRepository.getByEmail(email);
		if (!animator)
			throw new Error('There is no animator with the email being given!');
		return animator;
	}

	async updateAnimator(updateAnimatorDto: UpdateAnimatorDto, uid: string) {
		// check if the animator exists
		const animator = await this.animatorRepository.getByUid(uid);
		if (!animator) {
			throw new Error('animatorDoesntExists');
		}

		return await this.animatorRepository.updateAnimator(updateAnimatorDto, uid);
		
	}

	async deleteAnimator(email: string) {
		return await this.animatorRepository.deleteAnimator(email);
	}
}

@Injectable()
export class FormatorService {
	constructor(
		private readonly formatorRepository: FormatorRepository,
		private readonly workingHoursManager: WorkingHoursManager,
	) {}

	async createFormator(createFormatorDto: CreateFormatorDto) {
		const formator = await this.formatorRepository.getByEmail(createFormatorDto.email);

		if (formator) throw new Error('Formator already exist with this email!');

		const workingHours: CreateWorkingTimeDto[] = createFormatorDto.workingHours;

		await this.workingHoursManager.validateWorkingHours(workingHours, createFormatorDto.email);

		const formatorItem: CreateFormatorItem = {
			name: createFormatorDto.name,
			email: createFormatorDto.email,
			organizationId: createFormatorDto.organizationId,
		};

		const newFormator = await this.formatorRepository.createFormator(formatorItem);

		await this.workingHoursManager.addWorkingHours(workingHours, createFormatorDto.email);

		return { ...newFormator, workingHours };
	}

	async getFormator(email: string): Promise<Formator> {
		if (!email)
			throw new Error('emailRequired');
		const formator: Formator | null = await this.formatorRepository.getByEmail(email);
		if (!formator)
			throw new Error('There is no formator with the email being given!');
		return formator;
	}

}
