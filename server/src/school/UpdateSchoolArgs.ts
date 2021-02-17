import { ArgsType, Field } from "@nestjs/graphql";
import { SchoolWhereUniqueInput } from "./SchoolWhereUniqueInput";
import { SchoolUpdateInput } from "./SchoolUpdateInput";

@ArgsType()
class UpdateSchoolArgs {
  @Field(() => SchoolWhereUniqueInput, { nullable: false })
  where!: SchoolWhereUniqueInput;
  @Field(() => SchoolUpdateInput, { nullable: false })
  data!: SchoolUpdateInput;
}

export { UpdateSchoolArgs };
