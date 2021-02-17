import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";
import { SchoolWhereUniqueInput } from "../school/SchoolWhereUniqueInput";

export type UserWhereInput = {
  createdAt?: Date;
  emailAddress?: string | null;
  firstName?: string | null;
  id?: string;
  lastName?: string | null;
  organization?: OrganizationWhereUniqueInput | null;
  school?: SchoolWhereUniqueInput | null;
  updatedAt?: Date;
  username?: string;
};
