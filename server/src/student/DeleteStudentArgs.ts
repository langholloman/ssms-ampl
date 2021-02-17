import { ArgsType, Field } from "@nestjs/graphql";
import { StudentWhereUniqueInput } from "./StudentWhereUniqueInput";

@ArgsType()
class DeleteStudentArgs {
  @Field(() => StudentWhereUniqueInput, { nullable: false })
  where!: StudentWhereUniqueInput;
}

export { DeleteStudentArgs };
