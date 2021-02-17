import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type User = {
  createdAt: Date;
  emailAddress: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  organization: OrganizationWhereUniqueInput | null;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
};
