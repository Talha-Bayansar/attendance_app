import { Actions } from "@/auth";
import {
  EmptyState,
  Layout,
  List,
  ListItem,
  LoadingIndicator,
  Modal,
} from "@/components";
import { t } from "@/locales";
import { api, appName, getMenuItems, Routes } from "@/utils";
import { type Unit } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

const OrganisationDetails = () => {
  const router = useRouter();
  const { id, title } = router.query;
  const { data, isFetching } = api.organisation.getOne.useQuery({
    id: id as string,
  });
  const mutation = api.unit.deleteOne.useMutation();
  const queryContext = api.useContext();

  const [selectedUnit, setSelectedUnit] = useState<Unit>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpenModal((value) => !value);
  };

  const selectUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    toggleModal();
  };

  const handleDelete = () => {
    mutation.mutate({ id: selectedUnit.id });
    queryContext.organisation.getOne.setData(
      { id: id as string },
      (oldData) => ({
        ...oldData,
        units: oldData.units.filter((unit) => unit.id !== selectedUnit.id),
      })
    );
    toggleModal();
  };

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
          ) : data?.units.length > 0 ? (
            <List>
              {data.units.map((unit) => (
                <ListItem
                  key={unit.id}
                  title={unit.name}
                  onClick={() =>
                    router.push(`${Routes.UNITS}/${unit.id}?title=${unit.name}`)
                  }
                  onEdit={() => router.push(`${Routes.UNITS}/${unit.id}/edit`)}
                  onDelete={() => selectUnit(unit)}
                />
              ))}
            </List>
          ) : (
            <EmptyState text={t.unit.noUnitsFound} />
          )}
          <Modal
            isOpen={isOpenModal}
            title={t.modal.removeUnit}
            onClose={toggleModal}
            onConfirm={handleDelete}
          />
        </main>
      </Layout>
    </>
  );
};

export default OrganisationDetails;
