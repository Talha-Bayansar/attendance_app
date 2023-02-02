import { Layout } from "@/components";
import { t } from "@/locales";
import { appName } from "@/utils";
import Head from "next/head";
import React from "react";

const WaitingRoom = () => {
  return (
    <>
      <Head>
        <title>{`${appName} - ${t.waitingRoom.title}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Layout title={t.waitingRoom.title} showNavBar={false}>
        <main className="grid min-h-screen place-items-center p-4">
          <h1 className="text-center">{t.waitingRoom.body} </h1>
        </main>
      </Layout>
    </>
  );
};

export default WaitingRoom;
