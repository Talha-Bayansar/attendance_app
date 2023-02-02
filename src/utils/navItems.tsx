import { BsFillCalendarDayFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { Routes } from "./routes";

export const unitNavItems = [
  {
    icon: <BsFillCalendarDayFill size={24} />,
    title: "Calendar",
    path: Routes.EVENTS,
  },
  {
    icon: <BiCategory size={24} />,
    title: "Categories",
    path: Routes.CATEGORIES,
  },
  {
    icon: <IoMdSettings size={24} />,
    title: "Settings",
    path: Routes.SETTINGS,
  },
];
