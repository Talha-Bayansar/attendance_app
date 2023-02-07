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

type Props = {
  title?: string;
  children: ReactNode;
  hasNavBar?: boolean;
  showAppBar?: boolean;
  requiredActions?: Actions[];
  actionButtonIcon?: ReactNode;
  onClickActionButton?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Layout = ({
  title,
  children,
  hasNavBar = false,
  showAppBar = true,
  requiredActions = [],
  actionButtonIcon,
  onClickActionButton,
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
          {showAppBar && (
            <AppBar
              actionButtonIcon={actionButtonIcon}
              onClickActionButton={onClickActionButton}
              className="sticky top-0"
            >
              {title}
            </AppBar>
          )}
          {children}
          {hasNavBar && (
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
