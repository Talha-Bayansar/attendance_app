import { type Organisation } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  organisation: Organisation;
  className?: string;
};

export const OrganisationItem = ({ organisation, className }: Props) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98, boxShadow: "none" }}
      className={`${
        className ?? ""
      } rounded-lg bg-secondary p-4 text-header2 text-white shadow-small`}
    >
      {organisation.name}
    </motion.div>
  );
};
