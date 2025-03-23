import { Module } from "@nestjs/common";
import { AttendenceController } from "./attendence.controller";
import { AttendenceRepository } from "./attendence.repository";
import { AttendenceService } from "./attendence.service";

@Module({
	controllers: [AttendenceController],
	providers: [AttendenceRepository, AttendenceService],
	exports: [AttendenceService]
})
export class AttendenceModule { }
