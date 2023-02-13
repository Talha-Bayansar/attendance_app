import { type MenuItem } from "@/components";
import { t } from "@/locales";
import React from "react";
import { MdEdit, MdAdd } from "react-icons/md";

type Props = {
  onAdd?: React.MouseEventHandler<HTMLButtonElement>;
  onEdit?: React.MouseEventHandler<HTMLButtonElement>;
};

export const getMenuItems = ({ onAdd, onEdit }: Props) => {
  const menuItems: MenuItem[] = [];
  if (onAdd) {
    menuItems.push({
      icon: <MdAdd />,
      text: t.common.add,
      onClick: onAdd,
    });
  }

  if (onEdit) {
    menuItems.push({
      icon: <MdEdit />,
      text: t.common.edit,
      onClick: onEdit,
    });
  }

  return menuItems;
};
