import { ArgsType, Field } from "@nestjs/graphql";
import { OrganizationWhereUniqueInput } from "./OrganizationWhereUniqueInput";

@ArgsType()
class FindOneOrganizationArgs {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  where!: OrganizationWhereUniqueInput;
}

export { FindOneOrganizationArgs };
