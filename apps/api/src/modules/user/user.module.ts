import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { userRepository } from "./user.repository";

@Module({
	controllers: [],
	providers: [userRepository, UserService],
	exports: [UserService],
})
export class UserModule {
}
