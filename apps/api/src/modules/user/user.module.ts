import { forwardRef, Global, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { userRepository } from "./user.repository";
import { CryptService } from "src/global/auth/crypt.service";
import { UserController } from "./user.controller";
import { AdminsModule } from "../admins/admins,module";

/**
 * @module UserModule
 * @description
 * This module is responsible for managing users.
*/
@Global()
@Module({
	imports: [AdminsModule],
	controllers: [UserController],
	providers: [UserService ,userRepository, CryptService],
	exports: [UserService, userRepository],
})
export class UserModule {}

