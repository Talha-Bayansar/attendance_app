import { EmptyState, InputField, Layout, LoadingIndicator } from "@/components";
import { MosqueItem } from "@/mosques";
import { api, appName } from "@/utils";
import Head from "next/head";
import React, { useState } from "react";
import { useFormik } from "formik";

const Mosques = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      setSearchQuery(values.search);
    },
  });

  const { data, isFetching } = api.mosque.getAllMosques.useQuery({
    take: 10,
    query: searchQuery,
  });

  return (
    <>
      <Head>
        <title>{`${appName} - ${"Mosques"}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Layout title="Mosques">
        <main className="flex flex-grow flex-col gap-8 p-4">
          <InputField
            className="mt-4"
            id="search"
            name="search"
            label="Search"
            value={values.search}
            onChange={handleChange}
            onBlur={() => handleSubmit()}
          />
          <div className="flex flex-grow flex-col gap-4">
            {isFetching ? (
              <LoadingIndicator />
            ) : data.length < 1 ? (
              <EmptyState text="No mosques found." />
            ) : (
              data.map((mosque) => (
                <MosqueItem key={mosque.id} mosque={mosque} />
              ))
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Mosques;