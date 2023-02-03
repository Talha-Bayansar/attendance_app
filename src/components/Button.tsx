import { motion } from "framer-motion";
import React, { type ReactNode } from "react";

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
      whileTap={{ boxShadow: "none", scale: 0.98 }}
      className={`rounded-lg border-none bg-secondary p-4 py-4 px-8 text-white shadow-small ${
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
