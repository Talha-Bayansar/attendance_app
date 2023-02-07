import { BsFillCalendarDayFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FaMosque } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { Routes } from "./routes";
import type { User } from "@prisma/client";
import { Role } from "@prisma/client";

export const getNavItems = (user: Partial<User>) => {
  switch (user.role) {
    case Role.APP_ADMIN:
      return adminNavItems;
    case Role.MOSQUE_ADMIN:
      return mosqueNavItems;
    case Role.ORGANISATION_ADMIN:
      return organisationNavItems;
    case Role.UNIT_ADMIN:
      return unitNavItems;
  }
};

export const adminNavItems = [
  {
    icon: <FaMosque size={24} />,
    title: "Mosques",
    path: Routes.MOSQUES,
  },
  {
    icon: <IoMdSettings size={24} />,
    title: "Settings",
    path: Routes.SETTINGS,
  },
];

export const mosqueNavItems = [
  {
    icon: <CgOrganisation size={24} />,
    title: "Organisations",
    path: Routes.ORGANISATIONS,
  },
  {
    icon: <IoMdSettings size={24} />,
    title: "Settings",
    path: Routes.SETTINGS,
  },
];

export const organisationNavItems = [
  {
    icon: <BiCategory size={24} />,
    title: "Units",
    path: Routes.UNITS,
  },
  {
    icon: <IoMdSettings size={24} />,
    title: "Settings",
    path: Routes.SETTINGS,
  },
];

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
