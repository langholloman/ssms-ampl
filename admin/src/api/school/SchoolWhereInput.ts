import { StudentWhereUniqueInput } from "../student/StudentWhereUniqueInput";

export type SchoolWhereInput = {
  createdAt?: Date;
  id?: string;
  schoolName?: string | null;
  student?: StudentWhereUniqueInput | null;
  updatedAt?: Date;
};
