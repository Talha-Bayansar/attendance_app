import React, { type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  items: NavItem[];
  activePath: string;
  className?: string;
};

export type NavItem = {
  icon: ReactNode;
  path: string;
  title: string;
};

export const NavBar = ({ items, activePath, className }: Props) => {
  return (
    <div
      className={`${
        className ?? ""
      } flex items-center justify-between rounded-full bg-primary p-1 shadow-small`}
    >
      {items.map((item) => (
        <Link
          href={item.path}
          className="relative flex flex-1 justify-center rounded-full p-1"
          key={item.path}
        >
          {item.path === activePath && (
            <motion.div
              layoutId="activeNavItem"
              className="absolute left-0 top-0 right-0 bottom-0 rounded-full bg-secondary"
              style={{ opacity: 0.7 }}
            />
          )}
          <button className="relative text-white hover:opacity-70 active:opacity-70">
            {item.icon}
          </button>
        </Link>
      ))}
    </div>
  );
};
