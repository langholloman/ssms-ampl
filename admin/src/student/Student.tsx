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
import { Student as TStudent } from "../api/student/Student";
import { StudentUpdateInput } from "../api/student/StudentUpdateInput";

export const Student = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/students/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TStudent,
    AxiosError,
    [string, string]
  >(["get-/api/students", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/students"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TStudent, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/students"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//students");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TStudent, AxiosError, StudentUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/students"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: StudentUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.firstName);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["firstName", "lastName", "username"]),
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
                title={`${"Student"} ${
                  data?.firstName && data?.firstName.length
                    ? data.firstName
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
              <TextField label="First Name" name="firstName" />
            </div>
            <div>
              <TextField label="Last Name" name="lastName" />
            </div>
            <div>
              <TextField label="Username" name="username" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
