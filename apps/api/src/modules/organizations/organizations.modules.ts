import { Module } from "@nestjs/common";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsService } from "./organizations.service";
import { OrganizationsRepository } from "./organizations.repository";
import { AbilitiesModule } from "../abilities/abilities.module";

@Module({
	imports: [AbilitiesModule],
	controllers: [OrganizationsController],
	providers: [OrganizationsService, OrganizationsRepository]
})
export class OrganizationsModule { }

