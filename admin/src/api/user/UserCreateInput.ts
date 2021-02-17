import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type UserCreateInput = {
  emailAddress?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  organization?: OrganizationWhereUniqueInput | null;
  password: string;
  roles: Array<string>;
  username: string;
};
