import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [],
  controllers: [AuthController],
  exports: [],
  providers: [],
})
export class AuthModule {}
