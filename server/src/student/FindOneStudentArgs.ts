import { ArgsType, Field } from "@nestjs/graphql";
import { StudentWhereUniqueInput } from "./StudentWhereUniqueInput";

@ArgsType()
class FindOneStudentArgs {
  @Field(() => StudentWhereUniqueInput, { nullable: false })
  where!: StudentWhereUniqueInput;
}

export { FindOneStudentArgs };
