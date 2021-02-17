import { ArgsType, Field } from "@nestjs/graphql";
import { StudentWhereInput } from "./StudentWhereInput";

@ArgsType()
class FindManyStudentArgs {
  @Field(() => StudentWhereInput, { nullable: true })
  where?: StudentWhereInput;
}

export { FindManyStudentArgs };
