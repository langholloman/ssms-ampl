import { ArgsType, Field } from "@nestjs/graphql";
import { SchoolWhereUniqueInput } from "./SchoolWhereUniqueInput";

@ArgsType()
class FindOneSchoolArgs {
  @Field(() => SchoolWhereUniqueInput, { nullable: false })
  where!: SchoolWhereUniqueInput;
}

export { FindOneSchoolArgs };
