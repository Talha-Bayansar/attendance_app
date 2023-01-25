import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AppBar = ({ children }: Props) => {
  return (
    <div className="flex h-24 items-center justify-center rounded-b-[32px] bg-gradient-to-br from-primary-transparent to-primary">
      <span className="text-center text-header2 text-white">{children}</span>
    </div>
  );
};
