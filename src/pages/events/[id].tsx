import { Layout } from "@/components";
import { useRouter } from "next/router";
import React from "react";

const EventDetailsPage = () => {
  const router = useRouter();
  const { id, title } = router.query;

  return <Layout title={title as string}>Event ID: {id}</Layout>;
};

export default EventDetailsPage;
