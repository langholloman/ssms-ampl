import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { TrainingTrack } from "../api/trainingTrack/TrainingTrack";

type Data = TrainingTrack[];

type Props = Omit<SelectFieldProps, "options">;

export const TrainingTrackSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/training-tracks",
    async () => {
      const response = await api.get("/api/training-tracks");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.trainingTrackName && item.trainingTrackName.length
              ? item.trainingTrackName
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
