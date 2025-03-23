
import { Controller, Get, Patch, Param, Body } from "@nestjs/common";
import { AttendenceService } from "./attendence.service";

@Controller('attendence')
export class AttendenceController {
	public constructor(
		private readonly attendenceService: AttendenceService
	) { }

	// Get attendance for a specific date
	@Get(':dateId')
	async getAttendence(
		@Param('dateId') dateId: string
	) {
		return await this.attendenceService.getAttendence(dateId);
	}

	// Get attendance for a specific user on a specific date
	@Get(':dateId/:userId')
	async getUserAttendence(
		@Param('userId') userId: string,
		@Param('dateId') dateId: string
	) {
		return await this.attendenceService.getUserAttendence(userId, dateId);
	}

	// Update a user's attendance record
	@Patch(":attendenceId")
	async updateUserAttendence(
		@Param('attendenceId') attendenceId: string,
		@Body('attended') attended: boolean
	) {
		return await this.attendenceService.updateUserAttendence(attendenceId, attended);
	}
}

