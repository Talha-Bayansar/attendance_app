import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const AppBar = ({ className, children }: Props) => {
  return (
    <header
      className={`flex h-20 items-center justify-center rounded-b-[32px] bg-gradient-to-br from-primary-transparent to-primary standalone:h-28 standalone:items-end standalone:pb-5 ${
        className ?? ""
      }`}
    >
      <span className="text-center text-header2 text-white">{children}</span>
    </header>
  );
};
