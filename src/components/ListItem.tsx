import { getMenuItems } from "@/utils";
import React from "react";
import { DropdownButton } from "./DropdownButton";

type Props = {
  className?: string;
  title: string;
  subTitle?: string;
  onEdit?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ListItem = ({
  className,
  title,
  subTitle,
  onEdit,
  onDelete,
  color,
  ...props
}: Props) => {
  return (
    <div className="relative">
      <button
        className={`flex w-full items-center justify-between rounded-lg bg-primary p-3 text-white ${
          className ?? ""
        }`}
        {...props}
        style={{ backgroundColor: color }}
      >
        <div className="flex flex-col justify-center gap-3">
          <h2 className="text-header2">{title}</h2>
          {subTitle && <h3 className="text-body text-gray-300">{subTitle}</h3>}
        </div>
      </button>
      {(onDelete || onEdit) && (
        <div className="absolute right-4 top-0 flex h-full items-center">
          <DropdownButton
            items={getMenuItems({
              onDelete,
              onEdit,
            })}
          />
        </div>
      )}
    </div>
  );
};
