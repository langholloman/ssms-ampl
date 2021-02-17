import { TrainingTrackWhereUniqueInput } from "../trainingTrack/TrainingTrackWhereUniqueInput";

export type ClassWhereInput = {
  className?: string;
  createdAt?: Date;
  id?: string;
  trainingTrack?: TrainingTrackWhereUniqueInput | null;
  updatedAt?: Date;
};
