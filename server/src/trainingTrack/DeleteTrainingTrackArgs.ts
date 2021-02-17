import { ArgsType, Field } from "@nestjs/graphql";
import { TrainingTrackWhereUniqueInput } from "./TrainingTrackWhereUniqueInput";

@ArgsType()
class DeleteTrainingTrackArgs {
  @Field(() => TrainingTrackWhereUniqueInput, { nullable: false })
  where!: TrainingTrackWhereUniqueInput;
}

export { DeleteTrainingTrackArgs };
