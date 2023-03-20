import React, { type ReactNode } from "react";
import { Menu } from "@headlessui/react";
import { colors } from "@/utils";
import { motion } from "framer-motion";
import { MdMoreVert } from "react-icons/md";

export type MenuItem = {
  icon?: ReactNode;
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type Props = {
  items: MenuItem[];
};

export const DropdownButton = ({ items }: Props) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as="div">
        <motion.button
          whileTap={{
            backgroundColor: colors.secondary,
          }}
          className="rounded-full p-1 text-white hover:bg-secondary"
        >
          <MdMoreVert size={24} />
        </motion.button>
      </Menu.Button>
      <Menu.Items className="absolute top-full right-0 z-50 flex flex-col gap-2 rounded-lg bg-secondary p-3 text-white shadow-small">
        {items.map((item) => (
          <Menu.Item key={`menuItem-${item.text}`} as="div">
            {() => (
              <motion.button
                whileTap={{ backgroundColor: colors.primary }}
                initial={{ backgroundColor: "transparent" }}
                className="flex w-full items-center gap-2 text-body"
                onClick={item.onClick}
              >
                {item.icon} {item.text && <span>{item.text}</span>}
              </motion.button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
