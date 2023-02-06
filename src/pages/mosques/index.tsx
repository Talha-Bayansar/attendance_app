import {
  DismissibleList,
  EmptyState,
  InputField,
  Layout,
  LoadingIndicator,
} from "@/components";
import { MosqueItem } from "@/mosques";
import { api, appName, Routes } from "@/utils";
import Head from "next/head";
import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { Actions } from "@/auth";
import { t } from "@/locales";
import { useRouter } from "next/router";

const Mosques = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      setSearchQuery(values.search);
    },
  });

  const queryContext = api.useContext();

  const { data, isFetching } = api.mosque.getAllMosques.useQuery({
    take: 10,
    query: searchQuery,
  });

  const mutation = api.mosque.deleteMosque.useMutation();

  const handleRemove = (id: string) => {
    mutation.mutate({ id: id });
    queryContext.mosque.getAllMosques.setData(
      {
        take: 10,
        query: searchQuery,
      },
      (oldData) => oldData.filter((mosque) => mosque.id !== id)
    );
  };

  return (
    <>
      <Head>
        <title>{`${appName} - ${t.mosque.title}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Layout
        title={t.mosque.title}
        requiredActions={[Actions.MOSQUE_READ]}
        hasActionButton
        onClickActionButton={() => router.push(`${Routes.MOSQUES}/create`)}
      >
        <main className="flex flex-grow flex-col gap-8 p-4">
          <form className="mt-4" onSubmit={handleSubmit}>
            <InputField
              id="search"
              name="search"
              label={t.mosque.search}
              value={values.search}
              onChange={handleChange}
            />
          </form>
          <div className="flex-grow">
            {isFetching ? (
              <LoadingIndicator />
            ) : data.length < 1 ? (
              <EmptyState text={t.mosque.noMosquesFound} />
            ) : (
              <DismissibleList data={data} onRemove={handleRemove}>
                {(mosque) => (
                  <Link
                    className="w-full"
                    href={`${Routes.MOSQUES}/${mosque.id}?title=${mosque.name}`}
                  >
                    <MosqueItem mosque={mosque} />
                  </Link>
                )}
              </DismissibleList>
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Mosques;
