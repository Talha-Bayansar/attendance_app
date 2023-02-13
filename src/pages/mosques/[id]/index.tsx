import { Actions } from "@/auth";
import { Button, EmptyState, Layout, LoadingIndicator } from "@/components";
import { t } from "@/locales";
import { api, appName, getMenuItems, Routes } from "@/utils";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const MosqueDetails = () => {
  const router = useRouter();
  const { id, title } = router.query;

  const menuItems = getMenuItems({
    onAdd: () => console.log("Go to add organisation screen."),
    onEdit: () => router.push(`${Routes.MOSQUES}/${id}/edit`),
  });

  const { data, isFetching } = api.mosque.getOneMosque.useQuery({
    id: id as string,
  });

  return (
    <>
      <Head>
        <title>{`${appName} - ${title}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Layout
        title={data?.name ?? (title as string)}
        menuItems={menuItems}
        requiredActions={[Actions.MOSQUE_READ]}
      >
        <main className="flex flex-grow flex-col gap-8 p-4">
          {isFetching ? (
            <LoadingIndicator />
          ) : data.organisations.length < 1 ? (
            <EmptyState text={t.mosque.noOrganisationsFound} />
          ) : (
            data.organisations.map((organisation) => (
              <Link
                key={organisation.id}
                href={`${Routes.ORGANISATIONS}/${organisation.id}?title=${organisation.name}`}
              >
                <Button className="text-left text-header2">
                  {organisation.name}
                </Button>
              </Link>
            ))
          )}
        </main>
      </Layout>
    </>
  );
};

export default MosqueDetails;
