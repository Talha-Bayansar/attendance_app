import { type MenuItem } from "@/components";
import { t } from "@/locales";
import React from "react";
import { MdEdit, MdAdd, MdDelete } from "react-icons/md";

type Props = {
  onAdd?: React.MouseEventHandler<HTMLButtonElement>;
  onEdit?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
};

export const getMenuItems = ({ onAdd, onEdit, onDelete }: Props) => {
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

  if (onDelete) {
    menuItems.push({
      icon: <MdDelete />,
      text: t.common.remove,
      onClick: onDelete,
    });
  }

  return menuItems;
};
