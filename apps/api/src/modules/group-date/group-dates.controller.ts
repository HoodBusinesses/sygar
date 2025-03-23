import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { AddGroupDateDto } from "./dto/add-group-date.dto";
import { UpdateGroupDateDto } from "./dto/update-group-participant.dto";
import { GroupDateService } from "./group-dates.service";

@Controller('group-dates')
export class GroupDateController {

	constructor(
		private readonly datesService: GroupDateService
	) { }


	@Post()
	async createDate(@Body() dto: AddGroupDateDto) {
		if (dto.startDates.length !== dto.endDates.length) throw new BadRequestException()

		for (let i = 0; i < dto.startDates.length; i++) {
			await this.datesService.createDate({
				startDate: dto.startDates[i]!,
				endDate: dto.endDates[i]!,
				group: { connect: { id: dto.groupId } }
			})
		}
		return { message: "success" }
	}

	@Put(":dateId")
	async updateGroup(
		@Body() dto: UpdateGroupDateDto,
		@Param("dateId") dateId: string
	) {
		return await this.datesService.updateDate(dateId, {
			...(dto.startDate ? { startDate: dto.startDate } : {}),
			...(dto.endDate ? { endDate: dto.endDate } : {}),
		})
	}

	@Delete(":dateId")
	async deleteGroup(
		@Param("dateId") dateId: string,
		@Query('organizationId') organizationId: string
	) {
		if (!organizationId) throw new BadRequestException();

		return await this.datesService.deleteDate(dateId);
	}

	@Get(":dateId")
	async getDate(
		@Param("dateId") dateId: string,
		@Query('organizationId') organizationId: string
	) {
		if (!organizationId) throw new BadRequestException();


		return await this.datesService.getDateByUniqueField('id', dateId);
	}

	@Get()
	async getAllDates(
		@Query() query: any
	) {
		if (!query.organizationId && !query.groupId) throw new BadRequestException('pls add organizationId')

		return await (
			this.datesService.getAllDates({ groupId: query.groupId },
				new PaginationDto(+(query.page || 1), +(query.limit || 50)),
			)
		)
	}
}
