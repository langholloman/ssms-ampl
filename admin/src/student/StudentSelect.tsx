import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Student } from "../api/student/Student";

type Data = Student[];

type Props = Omit<SelectFieldProps, "options">;

export const StudentSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/students",
    async () => {
      const response = await api.get("/api/students");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.firstName && item.firstName.length ? item.firstName : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
