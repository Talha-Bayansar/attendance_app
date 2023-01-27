import { t } from "@/locales";
import { addMonths } from "date-fns";
import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

type Props = {
  className?: string;
  month: Date;
  onChange: (date: Date) => unknown;
};

export const MonthSwitcher = ({ className, month, onChange }: Props) => {
  const handleChange = (type: "next" | "previous") => {
    onChange(type === "next" ? addMonths(month, 1) : addMonths(month, -1));
  };

  return (
    <div
      className={`flex items-center justify-between rounded-full p-2 shadow-large ${
        className ?? ""
      }`}
    >
      <HiOutlineChevronLeft
        onClick={() => handleChange("previous")}
        className="text-primary hover:text-primary-transparent active:text-primary-transparent"
        size={32}
      />

      <span>
        {month.toLocaleDateString(t.getLanguage(), {
          month: "long",
          year: "numeric",
        })}
      </span>

      <HiOutlineChevronRight
        onClick={() => handleChange("next")}
        className="text-primary hover:text-primary-transparent active:text-primary-transparent"
        size={32}
      />
    </div>
  );
};
