import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Student } from "../api/student/Student";

type Props = { id: string };

export const StudentTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Student,
    AxiosError,
    [string, string]
  >(["get-/api/students", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/students"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/students"}/${id}`} className="entity-id">
      {data?.firstName && data?.firstName.length ? data.firstName : data?.id}
    </Link>
  );
};
