import { ArgsType, Field } from "@nestjs/graphql";
import { TrainingTrackCreateInput } from "./TrainingTrackCreateInput";

@ArgsType()
class CreateTrainingTrackArgs {
  @Field(() => TrainingTrackCreateInput, { nullable: false })
  data!: TrainingTrackCreateInput;
}

export { CreateTrainingTrackArgs };
