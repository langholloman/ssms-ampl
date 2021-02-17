import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Organization } from "../api/organization/Organization";

type Props = { id: string };

export const OrganizationTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Organization,
    AxiosError,
    [string, string]
  >(["get-/api/organizations", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/organizations"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/organizations"}/${id}`} className="entity-id">
      {data?.organizationName && data?.organizationName.length
        ? data.organizationName
        : data?.id}
    </Link>
  );
};
