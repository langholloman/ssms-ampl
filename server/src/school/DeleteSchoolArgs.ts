import { ArgsType, Field } from "@nestjs/graphql";
import { SchoolWhereUniqueInput } from "./SchoolWhereUniqueInput";

@ArgsType()
class DeleteSchoolArgs {
  @Field(() => SchoolWhereUniqueInput, { nullable: false })
  where!: SchoolWhereUniqueInput;
}

export { DeleteSchoolArgs };
