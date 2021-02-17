import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { StudentResolver } from "./student.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class StudentModule {}
