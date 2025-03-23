import { Injectable } from "@nestjs/common";
import { AttendenceRepository } from "./attendence.repository";

@Injectable()
export class AttendenceService {

	public constructor(private readonly attendenceRepository: AttendenceRepository) { }

	async createUserAttendence(
		participantId: string,
		dateId: string
	) {
		return await this.attendenceRepository.create(participantId, dateId)
	}

	async getAttendence(
		dateId: string
	) {
		return await this.attendenceRepository.getForDate(dateId)
	}

	async getUserAttendence(
		participantId: string,
		dateId: string
	) {

		return await this.attendenceRepository.getForUser(participantId, dateId)
	}

	async updateUserAttendence(
		attendenceId: string,
		attended: boolean
	) {
		return await this.attendenceRepository.update(attendenceId, attended)
	}
}
