import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { GroupParticipantService } from "./group-participants.service";
import { AddGroupParticipantDto } from "./dto/add-group-participant.dto";
import { UpdateGroupParticipantDto } from "./dto/update-group-participant.dto";

@Controller('group-participants')
export class GroupParticipantController {

	constructor(
		private readonly participantService: GroupParticipantService
	) { }


	@Post()
	async createGroup(@Body() dto: AddGroupParticipantDto) {
		return await this.participantService.createParticipant({
			firstName: dto.firstName,
			lastName: dto.lastName,
			phone: dto.phone,
			group: { connect: { id: dto.groupId } },
			identity: dto.identity,
			identityType: dto.identityType,
			status: dto.role,
			email: dto.email,
			cnss: dto.cnss
		})
	}

	@Put(":participantId")
	async updateGroup(
		@Body() dto: UpdateGroupParticipantDto,
		@Param("participantId") participantId: string
	) {
		return await this.participantService.updateParticipant(participantId, {
			...(dto.firstName ? { firstName: dto.firstName } : {}),
			...(dto.lastName ? { lastName: dto.lastName } : {}),
			...(dto.phone ? { phone: dto.phone } : {}),
			...(dto.email ? { email: dto.email } : {}),
		})
	}

	@Delete(":participantId")
	async deleteGroup(
		@Param("participantId") participantId: string,
		@Query('organizationId') organizationId: string
	) {
		if (!organizationId) throw new BadRequestException();

		return await this.participantService.deleteParticipant(participantId);
	}


	@Get(":participantId")
	async getGroup(
		@Param("participantId") participantId: string,
		@Query('organizationId') organizationId: string
	) {
		if (!organizationId) throw new BadRequestException();

		return await this.participantService.getParticipantByUniqueField('id', participantId);
	}

	@Get()
	async getAllGroup(
		@Query() query: any
	) {
		if (!query.organizationId && !query.groupId) throw new BadRequestException('pls add organizationId')

		return await (
			query.search ? this.participantService.searchInAllParticipant(
				query.search,
				new PaginationDto(+(query.page || 1), +(query.limit || 50)),
				{ groupId: query.groupId }
			) : this.participantService.getAllParticipant({ groupId: query.groupId },
				new PaginationDto(+(query.page || 1), +(query.limit || 50)),
			)
		)
	}
}
