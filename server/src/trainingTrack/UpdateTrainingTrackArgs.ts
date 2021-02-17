import { ArgsType, Field } from "@nestjs/graphql";
import { TrainingTrackWhereUniqueInput } from "./TrainingTrackWhereUniqueInput";
import { TrainingTrackUpdateInput } from "./TrainingTrackUpdateInput";

@ArgsType()
class UpdateTrainingTrackArgs {
  @Field(() => TrainingTrackWhereUniqueInput, { nullable: false })
  where!: TrainingTrackWhereUniqueInput;
  @Field(() => TrainingTrackUpdateInput, { nullable: false })
  data!: TrainingTrackUpdateInput;
}

export { UpdateTrainingTrackArgs };
