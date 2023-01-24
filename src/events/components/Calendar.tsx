import React from "react";
import { eachDayOfInterval, endOfMonth, isToday, isSameDay } from "date-fns";
import { t } from "@/locales";

type Props = {
  selectedDay: Date;
  month: Date;
  onChange: (day: Date) => unknown;
};

export const Calendar = ({ selectedDay, month, onChange }: Props) => {
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
            onClick={() => onChange(day)}
            className={`${colStartClasses[transformDay(day.getDay())]}${
              isToday(day) ? " bg-secondary bg-opacity-50" : ""
            }${
              isSameDay(day, selectedDay) ? " border border-black" : ""
            } flex h-8 w-8 items-center justify-center rounded-full text-center`}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};
