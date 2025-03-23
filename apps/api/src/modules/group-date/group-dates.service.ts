import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { GroupDateRepository } from "./group-dates.repository";
import { GroupParticipantService } from "../group-participant/group-participants.service";
import { AttendenceService } from "../attendence/attendence.service";

@Injectable()
export class GroupDateService {
	constructor(
		private readonly datesRepository: GroupDateRepository,
		private readonly participantsService: GroupParticipantService,
		private readonly attendenceService: AttendenceService
	) { }

	async createDate(
		data: Prisma.GroupDateCreateInput
	) {

		const dateData = await this.datesRepository.createDate(data)
		// TODO: updatethis later
		const participants = await this.participantsService.getAllParticipant({ groupId: data.group.connect?.id || data.group.create?.id }, new PaginationDto(1, 100));

		for (const participant of participants.participants) {

			await this.attendenceService.createUserAttendence(participant.id, dateData.id);
		}

		return dateData
	}

	async updateDate(
		dateId: string,
		update: Prisma.GroupDateUpdateInput
	) {
		if (update.startDate) {
		}

		if (update.endDate) {
		}
		return await this.datesRepository.updateDate(dateId, update)
	}

	async deleteDate(dateId: string) {
		return await this.datesRepository.deleteDate(dateId);
	}

	async getDateByUniqueField<K extends keyof Prisma.GroupDateWhereUniqueInput, V extends Prisma.GroupDateWhereUniqueInput[K]>(
		key: K,
		value: V
	) {
		return await this.datesRepository.getDateByUniqueField(key, value)
	}

	async getDateByField<K extends keyof Prisma.GroupDateWhereInput, V extends Prisma.GroupDateWhereInput[K]>(
		key: K,
		value: V
	) {
		return await this.datesRepository.getDateByField(key, value)
	}

	async getAllDates(where: Prisma.GroupDateWhereInput, pagination: PaginationDto) {
		return await this.datesRepository.getAllDates(
			where,
			pagination
		)

	}
}
