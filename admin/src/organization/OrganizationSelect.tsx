import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Organization } from "../api/organization/Organization";

type Data = Organization[];

type Props = Omit<SelectFieldProps, "options">;

export const OrganizationSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/organizations",
    async () => {
      const response = await api.get("/api/organizations");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.organizationName && item.organizationName.length
              ? item.organizationName
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
