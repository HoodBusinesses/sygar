import { Injectable } from "@nestjs/common";
import { DatabseService } from "src/lib/databse/datbase.service";

@Injectable()
export class AttendenceRepository {

	constructor(
		private readonly dbService: DatabseService
	) { }


	async create(
		participantId: string,
		dateId: string
	) {
		return await this.dbService.groupAttendance.create(
			{
				data: {
					participantId,
					groupDateId: dateId
				}
			}
		)
	}

	async getForDate(dateId: string) {
		return await this.dbService.groupAttendance.findMany({
			where: {
				groupDateId: dateId,
			}
		})
	}

	async getForUser(
		participantId: string,
		dateId: string
	) {
		return await this.dbService.groupAttendance.findFirst({
			where: {
				groupDateId: dateId,
				participantId
			}
		})
	}


	async update(attendenceId: string, attended: boolean) {
		return await this.dbService.groupAttendance.update(
			{ where: { id: attendenceId }, data: { attended } }
		)
	}

}
