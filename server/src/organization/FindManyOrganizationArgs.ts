import { ArgsType, Field } from "@nestjs/graphql";
import { OrganizationWhereInput } from "./OrganizationWhereInput";

@ArgsType()
class FindManyOrganizationArgs {
  @Field(() => OrganizationWhereInput, { nullable: true })
  where?: OrganizationWhereInput;
}

export { FindManyOrganizationArgs };
