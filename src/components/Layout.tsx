import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { LoadingIndicator } from "./LoadingIndicator";
import { NavBar } from "./NavBar";
import { Unauthenticated } from "./Unauthenticated";
import { type Actions, hasPermission } from "@/auth";
import Unauthorized from "./Unauthorized";
import { getNavItems } from "@/utils";
import { type MenuItem } from "./DropdownButton";

type Props = {
  title?: string;
  children: ReactNode;
  showNavBar?: boolean;
  showAppBar?: boolean;
  requiredActions?: Actions[];
  menuItems?: MenuItem[];
};

export const Layout = ({
  title,
  children,
  showNavBar = true,
  showAppBar = true,
  requiredActions = [],
  menuItems,
}: Props) => {
  const { data, status } = useSession();
  const router = useRouter();
  const user = data?.user;

  return (
    <div
      className={`flex min-h-screen w-screen flex-col ${showNavBar && "pb-12"}`}
    >
      {status === "loading" ? (
        <LoadingIndicator isFullScreen />
      ) : status === "unauthenticated" ? (
        <Unauthenticated />
      ) : requiredActions.length > 0 &&
        !requiredActions.every((action) => hasPermission(user, action)) ? (
        <Unauthorized />
      ) : (
        <>
          {showAppBar && (
            <AppBar menuItems={menuItems} className="sticky top-0">
              {title}
            </AppBar>
          )}
          {children}
          {showNavBar && (
            <div className="fixed bottom-0 w-full p-4 standalone:bottom-4">
              <NavBar
                activePath={router.pathname}
                items={getNavItems(data.user)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
