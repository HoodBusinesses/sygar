import { Global, Module } from "@nestjs/common";
import { DatabseService } from "./datbase.service";

@Global()
@Module({ providers: [DatabseService], exports: [DatabseService] })
export class DatabaseModule { }
