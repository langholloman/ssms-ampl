import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { School } from "../api/school/School";

type Props = { id: string };

export const SchoolTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    School,
    AxiosError,
    [string, string]
  >(["get-/api/schools", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/schools"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/schools"}/${id}`} className="entity-id">
      {data?.schoolName && data?.schoolName.length ? data.schoolName : data?.id}
    </Link>
  );
};
