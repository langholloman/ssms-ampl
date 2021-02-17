import { TrainingTrackWhereUniqueInput } from "../trainingTrack/TrainingTrackWhereUniqueInput";

export type Class = {
  className: string;
  createdAt: Date;
  id: string;
  trainingTrack: TrainingTrackWhereUniqueInput | null;
  updatedAt: Date;
};
