import { StudentWhereUniqueInput } from "../student/StudentWhereUniqueInput";

export type School = {
  createdAt: Date;
  id: string;
  schoolName: string | null;
  student: StudentWhereUniqueInput | null;
  updatedAt: Date;
};
