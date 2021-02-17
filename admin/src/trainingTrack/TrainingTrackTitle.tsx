import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { TrainingTrack } from "../api/trainingTrack/TrainingTrack";

type Props = { id: string };

export const TrainingTrackTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TrainingTrack,
    AxiosError,
    [string, string]
  >(["get-/api/training-tracks", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/training-tracks"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/training-tracks"}/${id}`} className="entity-id">
      {data?.trainingTrackName && data?.trainingTrackName.length
        ? data.trainingTrackName
        : data?.id}
    </Link>
  );
};
