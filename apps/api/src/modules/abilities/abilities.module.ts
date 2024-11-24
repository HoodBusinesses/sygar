import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { OrganizationsModule } from '../organizations/organizations.modules';
import { AbilitiesService } from './abilities.service';
import { AbilitiesRepository } from './abilities.repository';

@Module({
	imports: [UserModule, OrganizationsModule],
	providers: [AbilitiesService, AbilitiesRepository],
	exports: [AbilitiesService]

})
export class AbilitiesModule { }
