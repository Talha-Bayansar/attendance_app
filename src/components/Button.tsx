import React, { type ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: ReactNode;
  type?: "button" | "reset" | "submit";
};

export const Button: React.FC<Props> = ({
  className,
  children,
  onClick,
  disabled = false,
  type,
}: Props) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98, boxShadow: "none" }}
      className={`w-full rounded-lg bg-secondary p-4 text-white shadow-small ${
        className || ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
};
