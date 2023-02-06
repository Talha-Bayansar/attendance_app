import { Button, InputField, Layout } from "@/components";
import { PuffLoader } from "react-spinners";
import { api, appName, Routes } from "@/utils";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { t } from "@/locales";

const CreateMosque = () => {
  const mutation = api.mosque.createMosque.useMutation();
  const router = useRouter();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      mutation.mutate(
        { name: values.name },
        {
          onSuccess() {
            router.push(Routes.MOSQUES);
          },
        }
      );
    },
  });

  return (
    <>
      <Head>
        <title>{`${appName} - ${t.mosque.newMosque}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Layout title={t.mosque.newMosque}>
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

export default CreateMosque;