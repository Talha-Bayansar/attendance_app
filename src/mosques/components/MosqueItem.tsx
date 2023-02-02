import { type Mosque } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  mosque: Mosque;
  className?: string;
};

export const MosqueItem = ({ mosque, className }: Props) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98, boxShadow: "none" }}
      className={`${
        className ?? ""
      } rounded-lg bg-secondary p-4 text-header2 text-white shadow-small`}
    >
      {mosque.name}
    </motion.div>
  );
};
