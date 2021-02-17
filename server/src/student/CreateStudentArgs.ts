import { ArgsType, Field } from "@nestjs/graphql";
import { StudentCreateInput } from "./StudentCreateInput";

@ArgsType()
class CreateStudentArgs {
  @Field(() => StudentCreateInput, { nullable: false })
  data!: StudentCreateInput;
}

export { CreateStudentArgs };
