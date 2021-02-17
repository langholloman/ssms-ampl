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
import { School } from "../api/school/School";
import { SchoolCreateInput } from "../api/school/SchoolCreateInput";

const INITIAL_VALUES = {} as SchoolCreateInput;

export const CreateSchool = (): React.ReactElement => {
  useBreadcrumbs("/schools/new", "Create School");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    School,
    AxiosError,
    SchoolCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/schools", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/schools"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: SchoolCreateInput) => {
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
            <FormHeader title={"Create School"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="School Name" name="schoolName" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
