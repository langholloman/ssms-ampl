import { StudentWhereUniqueInput } from "../student/StudentWhereUniqueInput";

export type SchoolCreateInput = {
  schoolName?: string | null;
  student?: StudentWhereUniqueInput | null;
};
