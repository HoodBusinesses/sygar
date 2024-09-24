import { Injectable } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { OrganizationRepository } from "./organization.repository";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { UserService } from "../user/user.service";

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
			throw new Error('Organization already exists with the provided CNSS');
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
			throw new Error('Organization does not exist');
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
			throw new Error('CNSS is required');
		}
		
		// Find the organization by CNSS
		const organization = await this.organizationRepository.findByCnss(cnss);
		
		// Throw an error if the organization does not exist
		if (!organization) {
			throw new Error('Organization does not exist');
		}

		// Erase all users in the organization
		await this.userService.eraseAllUsersInOrganization(organization.cnss);

		// Delete the organization
		return this.organizationRepository.deleteOrganization(cnss);
	}
}