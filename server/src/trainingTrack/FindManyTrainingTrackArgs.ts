import { ArgsType, Field } from "@nestjs/graphql";
import { TrainingTrackWhereInput } from "./TrainingTrackWhereInput";

@ArgsType()
class FindManyTrainingTrackArgs {
  @Field(() => TrainingTrackWhereInput, { nullable: true })
  where?: TrainingTrackWhereInput;
}

export { FindManyTrainingTrackArgs };
