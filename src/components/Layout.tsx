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
import { type Actions, hasPermission } from "@/auth";
import Unauthorized from "./Unauthorized";

type Props = {
  title?: string;
  children: ReactNode;
  showNavBar?: boolean;
  showAppBar?: boolean;
  requiredActions?: Actions[];
};

export const Layout = ({
  title,
  children,
  showNavBar = true,
  showAppBar = true,
  requiredActions = [],
}: Props) => {
  const { data, status } = useSession();
  const router = useRouter();
  const user = data?.user;

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
      ) : requiredActions.length > 0 &&
        !requiredActions.every((action) => hasPermission(user, action)) ? (
        <Unauthorized />
      ) : (
        <>
          {showAppBar && <AppBar className="sticky top-0">{title}</AppBar>}
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
