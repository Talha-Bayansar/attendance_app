import { Routes } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { LoadingIndicator } from "./LoadingIndicator";
import { NavBar } from "./NavBar";
import { Unauthenticated } from "./Unauthenticated";
import { BsFillCalendarDayFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

type Props = {
  title: string;
  children: ReactNode;
  showNavBar?: boolean;
};

export const Layout = ({ title, children, showNavBar = true }: Props) => {
  const { status } = useSession();
  const router = useRouter();

  const navItems = [
    {
      icon: <BsFillCalendarDayFill size={24} />,
      title: "Calendar",
      path: Routes.ROOT,
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

  return (
    <div className="flex min-h-screen w-screen flex-col">
      {status === "loading" ? (
        <LoadingIndicator isFullScreen />
      ) : status === "unauthenticated" ? (
        <Unauthenticated />
      ) : (
        <>
          <AppBar className="sticky top-0">{title}</AppBar>
          {children}
          {showNavBar && (
            <div className="fixed bottom-0 w-full p-4 standalone:bottom-4">
              <NavBar activePath={router.pathname} items={navItems} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
