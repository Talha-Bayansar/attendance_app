import { Layout } from "@/components";
import { appName, unitNavItems } from "@/utils";
import Head from "next/head";
import React from "react";

const Settings = () => {
  return (
    <>
      <Head>
        <title>{`${appName} - ${"Settings"}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Layout title="Settings" navItems={unitNavItems}>
        Settings
      </Layout>
      ;
    </>
  );
};

export default Settings;
