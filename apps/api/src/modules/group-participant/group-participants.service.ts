import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { GroupParticipantsRepository } from "./group-participants.repository";

@Injectable()
export class GroupParticipantService {
	constructor(
		private readonly participantsRepository: GroupParticipantsRepository
	) { }

	async createParticipant(
		data: Prisma.ParticipantCreateInput
	) {
		const isEmailExists = await this.participantsRepository.getParticipantByUniqueField('email', data.email);

		if (isEmailExists) {
			throw new ConflictException('email already exists')
		}

		const isCnssExists = await this.participantsRepository.getParticipantByUniqueField('cnss', data.cnss);

		if (isCnssExists) {
			throw new ConflictException('cnss already exists')
		}

		const isPhoneExists = await this.participantsRepository.getParticipantByUniqueField('phone', data.phone);

		if (isPhoneExists) {
			throw new ConflictException('phone already exists')
		}

		return await this.participantsRepository.createParticipant(data)
	}

	async updateParticipant(
		participantId: string,
		update: Prisma.ParticipantUpdateInput
	) {
		if (update.email) {
			const isEmailExists = await this.participantsRepository.getParticipantByUniqueField('email', update.email as string);

			if (isEmailExists) {
				throw new ConflictException('email already exists')
			}
		}

		if (update.phone) {
			const isPhoneExists = await this.participantsRepository.getParticipantByUniqueField('phone', update.phone as string);

			if (isPhoneExists) {
				throw new ConflictException('phone already exists')
			}
		}
		return await this.participantsRepository.updateParticipant(participantId, update)
	}

	async deleteParticipant(participantId: string) {
		return await this.participantsRepository.deleteParticipant(participantId);
	}

	async getParticipantByUniqueField<K extends keyof Prisma.ParticipantWhereUniqueInput, V extends Prisma.ParticipantWhereUniqueInput[K]>(
		key: K,
		value: V
	) {
		return await this.participantsRepository.getParticipantByUniqueField(key, value)
	}

	async getParticipantByField<K extends keyof Prisma.ParticipantWhereInput, V extends Prisma.ParticipantWhereInput[K]>(
		key: K,
		value: V
	) {
		return await this.participantsRepository.getParticipantByField(key, value)
	}

	async getAllParticipant(where: Prisma.ParticipantWhereInput, pagination: PaginationDto) {
		return await this.participantsRepository.getAllParticipants(
			where,
			pagination
		)

	}

	async searchInAllParticipant(search: string, pagination: PaginationDto, where: Prisma.ParticipantWhereInput) { // Define a filter that will match the search term across the desired fields
		return await this.participantsRepository.searchInAllParticipants(search, pagination, where)
	}
}
