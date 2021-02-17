import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TrainingTrack as TTrainingTrack } from "../api/trainingTrack/TrainingTrack";
import { TrainingTrackUpdateInput } from "../api/trainingTrack/TrainingTrackUpdateInput";

export const TrainingTrack = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/training-tracks/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TTrainingTrack,
    AxiosError,
    [string, string]
  >(["get-/api/training-tracks", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/training-tracks"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TTrainingTrack, AxiosError>(
    async (data) => {
      const response = await api.delete(
        `${"/api/training-tracks"}/${id}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//training-tracks");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TTrainingTrack, AxiosError, TrainingTrackUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/training-tracks"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: TrainingTrackUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.trainingTrackName);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["addDays", "dayCount", "trainingTrackName"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Training Track"} ${
                  data?.trainingTrackName && data?.trainingTrackName.length
                    ? data.trainingTrackName
                    : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField label="Add Days" name="addDays" />
            </div>
            <div>
              <TextField label="Day Count" name="dayCount" />
            </div>
            <div>
              <TextField label="Training Track Name" name="trainingTrackName" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
