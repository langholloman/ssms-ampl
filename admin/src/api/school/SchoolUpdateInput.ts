import { StudentWhereUniqueInput } from "../student/StudentWhereUniqueInput";

export type SchoolUpdateInput = {
  schoolName?: string | null;
  student?: StudentWhereUniqueInput | null;
};
