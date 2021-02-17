import { TrainingTrackWhereUniqueInput } from "../trainingTrack/TrainingTrackWhereUniqueInput";

export type ClassCreateInput = {
  className: string;
  trainingTrack?: TrainingTrackWhereUniqueInput | null;
};
