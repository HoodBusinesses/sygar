import { Module } from '@nestjs/common';
import { AbilitiesService } from './abilities.service';
import { AbilitiesRepository } from './abilities.repository';

@Module({
	imports: [],
	providers: [AbilitiesService, AbilitiesRepository],
	exports: [AbilitiesService]

})
export class AbilitiesModule { }
