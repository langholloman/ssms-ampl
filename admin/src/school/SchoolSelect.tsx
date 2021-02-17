import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { School } from "../api/school/School";

type Data = School[];

type Props = Omit<SelectFieldProps, "options">;

export const SchoolSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/schools",
    async () => {
      const response = await api.get("/api/schools");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.schoolName && item.schoolName.length
              ? item.schoolName
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
