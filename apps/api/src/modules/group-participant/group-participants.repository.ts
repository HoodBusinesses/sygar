import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabseService } from "src/lib/databse/datbase.service";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { getPaginationQuery, getPaginationResponse } from "src/shared/pagination";

@Injectable()
export class GroupParticipantsRepository {

	constructor(
		private readonly dbService: DatabseService
	) { }

	async createParticipant(
		data: Prisma.ParticipantCreateInput
	) {
		return await this.dbService.participant.create({ data })
	}

	async updateParticipant(
		participantId: string,
		update: Prisma.ParticipantUpdateInput
	) {
		return await this.dbService.participant.update({
			where: { id: participantId },
			data: update
		})
	}

	async deleteParticipant(participantId: string) {
		return await this.dbService.participant.delete({ where: { id: participantId } })
	}

	async getParticipantByUniqueField<K extends keyof Prisma.ParticipantWhereUniqueInput, V extends Prisma.ParticipantWhereUniqueInput[K]>(
		key: K,
		value: V
	) {
		return await this.dbService.participant.findUnique({
			where: {
				[key]: value
			} as any
		})
	}

	async getParticipantByField<K extends keyof Prisma.ParticipantWhereInput, V extends Prisma.ParticipantWhereInput[K]>(
		key: K,
		value: V
	) {
		return await this.dbService.participant.findFirst({
			where: {
				[key]: value
			}
		})
	}

	async getAllParticipants(where: Prisma.ParticipantWhereInput, pagination: PaginationDto) {

		// Fetch users based on the filter and handle pagination
		const [count, participants] = await Promise.all([
			this.dbService.participant.count({ where }),
			this.dbService.participant.findMany({
				where,
				...(getPaginationQuery(pagination))
			})]);

		return {
			participants,
			...(getPaginationResponse(pagination, count))
		}
	}

	async searchInAllParticipants(search: string, pagination: PaginationDto, where: Prisma.ParticipantWhereInput) { // Define a filter that will match the search term across the desired fields
		const filter: Prisma.ParticipantWhereInput = {
			AND: [
				{
					OR: [
						{ firstName: { contains: search, mode: 'insensitive' } },
						{ email: { contains: search, mode: 'insensitive' } },
						{ phone: { contains: search, mode: 'insensitive' } },
						{ lastName: { contains: search, mode: 'insensitive' } }
					]
				}, (where ? where : {})]
		};

		// Fetch users based on the filter and handle pagination
		const [count, participants] = await Promise.all([
			this.dbService.participant.count({ where: filter }),
			this.dbService.participant.findMany({
				where: filter,
				...(getPaginationQuery(pagination))
			})]);

		return {
			participants,
			...(getPaginationResponse(pagination, count))
		}
	}
}
