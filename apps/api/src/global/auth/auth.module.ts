import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [],
  controller: [AuthController],
  exports: [],
  providers: [],
})
export class AuthModule {}