import { Module } from "@nestjs/common";
import { GroupParticipantController } from "./group-participants.controller";
import { GroupParticipantsRepository } from "./group-participants.repository";
import { GroupParticipantService } from "./group-participants.service";

@Module({
	controllers: [GroupParticipantController],
	providers: [GroupParticipantsRepository, GroupParticipantService],
	exports: [GroupParticipantService]
})
export class GroupParticipantModule {

}
