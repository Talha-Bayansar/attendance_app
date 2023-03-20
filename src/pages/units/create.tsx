import { Actions } from "@/auth";
import { Layout, InputField, Button } from "@/components";
import { t } from "@/locales";
import { api, appName } from "@/utils";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { PuffLoader } from "react-spinners";

const CreateUnit = () => {
  const mutation = api.unit.create.useMutation();
  const router = useRouter();
  const { organisationId } = router.query;

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      admins: [],
    },
    onSubmit: (values) => {
      mutation.mutate(
        {
          name: values.name,
          organisationId: organisationId as string,
          admins: values.admins ?? [],
        },
        {
          onSuccess() {
            router.back();
          },
        }
      );
    },
  });

  return (
    <>
      <Head>
        <title>{`${appName} - ${t.unit.newUnit}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Layout
        title={t.unit.newUnit}
        requiredActions={[Actions.UNIT_CREATE]}
        showNavBar={false}
      >
        <form
          className="flex flex-grow flex-col justify-between p-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <InputField
              className="mt-4"
              id="name"
              label={t.common.name}
              name="name"
              value={values.name}
              onChange={handleChange}
              inputProps={{ required: true, autoComplete: "off" }}
            />
          </div>
          <Button
            className="mb-4 flex justify-center"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <PuffLoader size={24} color="white" />
            ) : (
              t.common.create
            )}
          </Button>
        </form>
      </Layout>
    </>
  );
};

export default CreateUnit;
