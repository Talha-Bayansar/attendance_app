import { Actions } from "@/auth";
import { Layout } from "@/components";
import { appName } from "@/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const OrganisationDetails = () => {
  const router = useRouter();
  const { id, title } = router.query;

  return (
    <>
      <Head>
        <title>{`${appName} - ${title}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Layout
        title={title as string}
        requiredActions={[Actions.ORGANISATION_READ]}
      >
        <main className="flex flex-grow flex-col gap-8 p-4">
          Organisation ID: {id}
        </main>
      </Layout>
    </>
  );
};

export default OrganisationDetails;
