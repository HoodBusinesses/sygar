import { BadRequestException, Injectable } from "@nestjs/common";
import { userRepository } from "./user.repository";

/**
 * A service for user-related operations.
 */
@Injectable()
export class UserService {

	constructor(
		private readonly userRepository: userRepository, // Inject the user repository for database operations
	) {}

	/**
	 * Method to get a user by email.
	 * @param email - The email of the user to get.
	 * @returns The user found or null if not found.
	 */
	async getByEmail(email: string) {
		if (!email) {
			throw new BadRequestException('Email is required');
		}
		return this.userRepository.findByEmail(email);
	}
}