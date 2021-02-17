import { ArgsType, Field } from "@nestjs/graphql";
import { SchoolCreateInput } from "./SchoolCreateInput";

@ArgsType()
class CreateSchoolArgs {
  @Field(() => SchoolCreateInput, { nullable: false })
  data!: SchoolCreateInput;
}

export { CreateSchoolArgs };
