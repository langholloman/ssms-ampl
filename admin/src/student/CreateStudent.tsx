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
import { Student } from "../api/student/Student";
import { StudentCreateInput } from "../api/student/StudentCreateInput";

const INITIAL_VALUES = {} as StudentCreateInput;

export const CreateStudent = (): React.ReactElement => {
  useBreadcrumbs("/students/new", "Create Student");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Student,
    AxiosError,
    StudentCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/students", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/students"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: StudentCreateInput) => {
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
            <FormHeader title={"Create Student"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
