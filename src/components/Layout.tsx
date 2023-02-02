import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { LoadingIndicator } from "./LoadingIndicator";
import { NavBar, type NavItem } from "./NavBar";
import { Unauthenticated } from "./Unauthenticated";
import { type Actions, hasPermission } from "@/auth";
import Unauthorized from "./Unauthorized";

type Props = {
  title?: string;
  children: ReactNode;
  navItems?: NavItem[];
  showAppBar?: boolean;
  requiredActions?: Actions[];
};

export const Layout = ({
  title,
  children,
  navItems,
  showAppBar = true,
  requiredActions = [],
}: Props) => {
  const { data, status } = useSession();
  const router = useRouter();
  const user = data?.user;

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
          {navItems && (
            <div className="fixed bottom-0 w-full p-4 standalone:bottom-4">
              <NavBar activePath={router.pathname} items={navItems} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
