import React, { type ReactNode } from "react";
import { eachDayOfInterval, endOfMonth } from "date-fns";
import { t } from "@/locales";

type Props = {
  month: Date;
  children: (day: Date) => ReactNode;
};

export const Calendar = ({ month, children }: Props) => {
  const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  const colStartClasses = [
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const days = eachDayOfInterval({
    start: month,
    end: endOfMonth(month),
  });

  const transformDay = (day: number) => {
    return day === 0 ? 6 : day - 1;
  };

  return (
    <div className="flex flex-col gap-8 rounded-[32px] py-8 px-4 shadow-large">
      <div className="grid grid-cols-7 place-items-center">
        {daysOfWeek.map((day, index) => (
          <div key={`day${index}`}>{t.common.days[day]}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 place-items-center gap-y-2">
        {days.map((day, index) => (
          <div
            key={`calendar_cell_${index}`}
            className={`${colStartClasses[transformDay(day.getDay())]}`}
          >
            {children(day)}
          </div>
        ))}
      </div>
    </div>
  );
};
