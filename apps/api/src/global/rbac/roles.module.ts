import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from './rbac.service';

@Global()
@Module({
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class RbacModule {}
