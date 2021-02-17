import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { SchoolService } from "./school.service";
import { SchoolController } from "./school.controller";
import { SchoolResolver } from "./school.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [SchoolController],
  providers: [SchoolService, SchoolResolver],
  exports: [SchoolService],
})
export class SchoolModule {}
