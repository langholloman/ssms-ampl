import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneTrainingTrackArgs,
  FindManyTrainingTrackArgs,
  TrainingTrackCreateArgs,
  TrainingTrackUpdateArgs,
  TrainingTrackDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class TrainingTrackService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyTrainingTrackArgs>(
    args: Subset<T, FindManyTrainingTrackArgs>
  ) {
    return this.prisma.trainingTrack.findMany(args);
  }
  findOne<T extends FindOneTrainingTrackArgs>(
    args: Subset<T, FindOneTrainingTrackArgs>
  ) {
    return this.prisma.trainingTrack.findOne(args);
  }
  create<T extends TrainingTrackCreateArgs>(
    args: Subset<T, TrainingTrackCreateArgs>
  ) {
    return this.prisma.trainingTrack.create<T>(args);
  }
  update<T extends TrainingTrackUpdateArgs>(
    args: Subset<T, TrainingTrackUpdateArgs>
  ) {
    return this.prisma.trainingTrack.update<T>(args);
  }
  delete<T extends TrainingTrackDeleteArgs>(
    args: Subset<T, TrainingTrackDeleteArgs>
  ) {
    return this.prisma.trainingTrack.delete(args);
  }
}
