import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const List = ({ children }: Props) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
