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
import { Organization } from "../api/organization/Organization";
import { OrganizationCreateInput } from "../api/organization/OrganizationCreateInput";

const INITIAL_VALUES = {} as OrganizationCreateInput;

export const CreateOrganization = (): React.ReactElement => {
  useBreadcrumbs("/organizations/new", "Create Organization");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Organization,
    AxiosError,
    OrganizationCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/organizations", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/organizations"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: OrganizationCreateInput) => {
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
            <FormHeader title={"Create Organization"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Organization Name" name="organizationName" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
