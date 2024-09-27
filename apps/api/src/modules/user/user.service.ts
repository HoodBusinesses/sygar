import { BadRequestException, Injectable } from "@nestjs/common";
import { userRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { OrganizationRepository } from "../organization/organization.repository";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRoles } from "./model/user.model";
import { AbilityService } from "../ability/abiliry.service";

/**
 * @class UserService
 * @description
 * This class is responsible for managing users.
*/
@Injectable()
export class UserService {
	/**
	 * @constructor
	 * @description
	 * This constructor is used to inject the user repository, organization repository, and ability service.
	*/
	constructor(
		private readonly userRepository: userRepository, // Inject the user repository for database operations
		private readonly organizationRepository: OrganizationRepository, // Inject the organization repository for database operations
		private readonly abilityService: AbilityService, // Inject the ability service for ability operations
	) {}

	/**
	 * @method create
	 * @description
	 * This method is used to create a new user.
	*/
	async create(user: CreateUserDto) {
		// check if the user already exists on the organization
		let userExists = await this.userRepository.findByEmail(user.email);

		if (userExists) {
			throw new Error('User already exists with the provided email');
		}

		// check if the user already exists with the provided CNSS
		userExists = await this.userRepository.findByCnss(user.cnss);

		if (userExists) {
			throw new Error('User already exists with the provided CNSS');
		}

		// check if the organization exists
		if (user.role === UserRoles.ORG_ADMIN || user.role === UserRoles.ORG_USER) {
			const organization = await this.organizationRepository.findByCnss(user.organizationId);

			if (!organization) {
				throw new Error('Organization does not exist with the provided organizationId');
			}

			// check if the organization is has an admin
			if (user.role === UserRoles.ORG_ADMIN) {
				const organizationAdmin = await this.userRepository.findByOrganizationId(user.organizationId);

				if (organizationAdmin.length > 0) {
					throw new Error('Organization already has an admin');
				}
			}
		}
		return await this.userRepository.create(user);
	}

	/**
	 * @method update
	 * @description
	 * This method is used to update a user.
	*/
	async update(user: UpdateUserDto) {
		// Check if the user exists
		const existingUser = await this.userRepository.findByUid(user.uid);

				if (!existingUser) {
					throw new Error('User does not exist');
				}
				if (user.cnss && user.cnss !== existingUser.cnss && await this.userRepository.findByCnss(user.cnss)) {
					throw new Error('User already exists with the provided CNSS');
				}
				if (user.email && user.email !== existingUser.email && await this.userRepository.findByEmail(user.email)) {
					throw new Error('User already exists with the provided email');
				}
		return await this.userRepository.update(user);
	}

	/**
	 * @method delete
	 * @description
	 * This method is used to delete a user.
	*/
	async delete(email: string) {
		// Check if the user exists
		const existingUser = await this.userRepository.findByEmail(email);

		if (!existingUser) {
			throw new Error('User does not exist');
		}

		try {
			await this.abilityService.eraseAbilities(existingUser.uid);
			return await this.userRepository.delete(email);
		} catch (error: any) {
			return { error: error.message }
		}
	}

	/**
	 * @method get
	 * @description
	 * This method is used to get a user by uid.
	*/
	async get(uid: string) {
		// Check if the user exists
		const existingUser = await this.userRepository.findByUid(uid);

		if (!existingUser) {
			throw new Error('User does not exist');
		}

		const { password, ...userWithOutPassword } = existingUser;

		return userWithOutPassword;
	}

	/**
	 * @method getByEmail
	 * @description
	 * This method is used to get a user by email.
	*/
	async getByEmail(email: string) {
		if (!email) {
			throw new BadRequestException('Email is required');
		}
		return this.userRepository.findByEmail(email);
	}

	/**
	 * @method eraseAllUsersInOrganization
	 * @description
	 * This method is used to erase all users in an organization.
	*/
	async eraseAllUsersInOrganization(organizationId: string) {
		const users = await this.userRepository.findByOrganizationId(organizationId);

		for (const user of users) {
			await this.delete(user.email);
		}

		return { message: 'Users deleted successfully' };
	}


	async setResetPasswordToken(uid: string, token: string | null, expiresAt: Date | null) {
		return this.userRepository.update({
			uid,
			resetPasswordToken: token,
			resetPasswordTokenExpiresAt: expiresAt?.getTime()?.toString()
		})
	}

	async getByResetPasswordToken(token: string) {
		return this.userRepository.findByResetPasswordToken(token);
	}

	async updatePassword(uid: string, password: string) {
		return this.userRepository.update({
			uid,
			password
		})
	}
}
