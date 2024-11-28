import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { AbilitiesModule } from '../abilities/abilities.module';

@Global()
@Module({
  imports: [AbilitiesModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule { }
