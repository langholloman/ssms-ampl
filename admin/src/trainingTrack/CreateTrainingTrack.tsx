import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TrainingTrack } from "../api/trainingTrack/TrainingTrack";
import { TrainingTrackCreateInput } from "../api/trainingTrack/TrainingTrackCreateInput";

const INITIAL_VALUES = {} as TrainingTrackCreateInput;

export const CreateTrainingTrack = (): React.ReactElement => {
  useBreadcrumbs("/training-tracks/new", "Create Training Track");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TrainingTrack,
    AxiosError,
    TrainingTrackCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/training-tracks", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/training-tracks"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TrainingTrackCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Training Track"}>
              <Button type="submit" disabled={isLoading}>
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
            <TextField type="datetime-local" label="End Date" name="endDate" />
          </div>
          <div>
            <TextField
              type="datetime-local"
              label="Start Date"
              name="startDate"
            />
          </div>
          <div>
            <TextField label="Training Track Name" name="trainingTrackName" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
