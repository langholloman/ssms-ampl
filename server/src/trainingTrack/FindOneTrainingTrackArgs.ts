import { ArgsType, Field } from "@nestjs/graphql";
import { TrainingTrackWhereUniqueInput } from "./TrainingTrackWhereUniqueInput";

@ArgsType()
class FindOneTrainingTrackArgs {
  @Field(() => TrainingTrackWhereUniqueInput, { nullable: false })
  where!: TrainingTrackWhereUniqueInput;
}

export { FindOneTrainingTrackArgs };
