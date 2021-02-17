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
import { StudentSelect } from "../student/StudentSelect";
import { School as TSchool } from "../api/school/School";
import { SchoolUpdateInput } from "../api/school/SchoolUpdateInput";

export const School = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/schools/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TSchool,
    AxiosError,
    [string, string]
  >(["get-/api/schools", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/schools"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TSchool, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/schools"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//schools");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TSchool, AxiosError, SchoolUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/schools"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: SchoolUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.schoolName);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["schoolName", "student"]),
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
                title={`${"School"} ${
                  data?.schoolName && data?.schoolName.length
                    ? data.schoolName
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
              <TextField label="School Name" name="schoolName" />
            </div>
            <div>
              <StudentSelect label="Student" name="student.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
