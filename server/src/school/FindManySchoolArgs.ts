import { ArgsType, Field } from "@nestjs/graphql";
import { SchoolWhereInput } from "./SchoolWhereInput";

@ArgsType()
class FindManySchoolArgs {
  @Field(() => SchoolWhereInput, { nullable: true })
  where?: SchoolWhereInput;
}

export { FindManySchoolArgs };
