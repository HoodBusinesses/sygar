import { Module } from "@nestjs/common";
import { GroupDateController } from "./group-dates.controller";
import { GroupDateRepository } from "./group-dates.repository";
import { GroupDateService } from "./group-dates.service";
import { GroupParticipantModule } from "../group-participant/group-participants.module";
import { AttendenceModule } from "../attendence/attendence.module";

@Module({
	imports: [GroupParticipantModule, AttendenceModule],
	controllers: [GroupDateController],
	providers: [GroupDateRepository, GroupDateService],
	exports: [GroupDateService]
})
export class GroupDateModule {

}
