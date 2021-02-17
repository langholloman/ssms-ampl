import { ArgsType, Field } from "@nestjs/graphql";
import { StudentWhereUniqueInput } from "./StudentWhereUniqueInput";
import { StudentUpdateInput } from "./StudentUpdateInput";

@ArgsType()
class UpdateStudentArgs {
  @Field(() => StudentWhereUniqueInput, { nullable: false })
  where!: StudentWhereUniqueInput;
  @Field(() => StudentUpdateInput, { nullable: false })
  data!: StudentUpdateInput;
}

export { UpdateStudentArgs };
