import React, { type ReactNode } from "react";
import { motion } from "framer-motion";
import { colors } from "@/utils";

type Props = {
  children: ReactNode;
  className?: string;
  actionButtonIcon?: ReactNode;
  onClickActionButton?: React.MouseEventHandler<HTMLButtonElement>;
};

export const AppBar = ({
  className,
  children,
  actionButtonIcon,
  onClickActionButton,
}: Props) => {
  return (
    <header
      className={`relative flex h-20 items-center justify-center rounded-b-[32px] bg-gradient-to-br from-primary-transparent to-primary standalone:h-28 standalone:items-end standalone:pb-5 ${
        className ?? ""
      }`}
    >
      <span className="text-center text-header2 text-white">{children}</span>
      {actionButtonIcon && (
        <motion.button
          whileTap={{
            backgroundColor: colors.secondary,
          }}
          onClick={onClickActionButton}
          className="absolute right-4 rounded-full p-1 text-white hover:bg-secondary"
        >
          {actionButtonIcon}
        </motion.button>
      )}
    </header>
  );
};
