import { forwardRef, Global, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { CryptService } from "src/global/auth/crypt.service";
import { UserController } from "./user.controller";
import { AdminsModule } from "../admins/admins,module";
import { NotificationsModule } from "src/global/notifactions/notifications.module";
import { OrganizationModule } from "../organization/organization.module";

/**
 * @module UserModule
 * @description
 * This module is responsible for managing users.
*/
@Global()
@Module({
	imports: [AdminsModule, NotificationsModule, forwardRef(() => OrganizationModule)],
	controllers: [UserController],
	providers: [UserService, UserRepository, CryptService],
	exports: [UserService, UserRepository],
})
export class UserModule {}

