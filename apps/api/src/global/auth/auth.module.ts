import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { CryptService } from './crypt.service';
import { UserModule } from 'src/modules/user/user.module';

@Global()
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  exports: [AuthService, CryptService],
  providers: [AuthService, JwtService, CryptService],
})
export class AuthModule {}
