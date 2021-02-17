import { TrainingTrackWhereUniqueInput } from "../trainingTrack/TrainingTrackWhereUniqueInput";

export type ClassUpdateInput = {
  className?: string;
  trainingTrack?: TrainingTrackWhereUniqueInput | null;
};
