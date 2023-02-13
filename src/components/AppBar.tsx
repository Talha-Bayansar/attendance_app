import React, { type ReactNode } from "react";
import { DropdownButton, type MenuItem } from "./DropdownButton";

type Props = {
  children: ReactNode;
  className?: string;
  menuItems?: MenuItem[];
};

export const AppBar = ({ className, children, menuItems }: Props) => {
  return (
    <header
      className={`relative flex h-20 items-center justify-center rounded-b-[32px] bg-gradient-to-br from-primary-transparent to-primary standalone:h-28 standalone:items-end standalone:pb-5 ${
        className ?? ""
      }`}
    >
      <span className="text-center text-header2 text-white">{children}</span>
      {menuItems && (
        <div className="absolute right-4">
          <DropdownButton items={menuItems} />
        </div>
      )}
    </header>
  );
};
