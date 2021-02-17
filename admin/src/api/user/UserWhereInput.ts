import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type UserWhereInput = {
  createdAt?: Date;
  emailAddress?: string | null;
  firstName?: string | null;
  id?: string;
  lastName?: string | null;
  organization?: OrganizationWhereUniqueInput | null;
  updatedAt?: Date;
  username?: string;
};
