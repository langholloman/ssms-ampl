import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";
import { SchoolWhereUniqueInput } from "../school/SchoolWhereUniqueInput";

export type UserUpdateInput = {
  emailAddress?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  organization?: OrganizationWhereUniqueInput | null;
  password?: string;
  roles?: Array<string>;
  school?: SchoolWhereUniqueInput | null;
  username?: string;
};
