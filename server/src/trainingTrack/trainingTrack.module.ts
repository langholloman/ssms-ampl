import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { TrainingTrackService } from "./trainingTrack.service";
import { TrainingTrackController } from "./trainingTrack.controller";
import { TrainingTrackResolver } from "./trainingTrack.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [TrainingTrackController],
  providers: [TrainingTrackService, TrainingTrackResolver],
  exports: [TrainingTrackService],
})
export class TrainingTrackModule {}
