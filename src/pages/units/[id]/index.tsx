import { Actions } from "@/auth";
import {
  Layout,
  LoadingIndicator,
  ListItem,
  EmptyState,
  List,
} from "@/components";
import { t } from "@/locales";
import { api, appName, getMenuItems, Routes } from "@/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const UnitDetails = () => {
  const router = useRouter();
  const { id, title } = router.query;
  const { data, isFetching } = api.unit.getOne.useQuery({
    id: id as string,
  });

  return (
    <>
      <Head>
        <title>{`${appName} - ${title}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Layout
        title={title as string}
        requiredActions={[Actions.ORGANISATION_READ]}
        menuItems={getMenuItems({
          onAdd: () =>
            router.push(`${Routes.UNITS}/create?organisationId=${id}`),
          onEdit: () => router.push(`${Routes.ORGANISATIONS}/${id}/edit`),
        })}
      >
        <main className="flex flex-grow flex-col gap-8 p-4">
          {isFetching ? (
            <LoadingIndicator />
          ) : data?.categories.length > 0 ? (
            <List>
              {data.categories.map((unit) => (
                <ListItem key={unit.id} title={unit.name} />
              ))}
            </List>
          ) : (
            <EmptyState text={t.unit.noUnitsFound} />
          )}
        </main>
      </Layout>
    </>
  );
};

export default UnitDetails;
