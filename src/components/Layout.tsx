import { useSession } from "next-auth/react";
import type { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { LoadingIndicator } from "./LoadingIndicator";
import { Unauthenticated } from "./Unauthenticated";

type Props = {
  title: string;
  children: ReactNode;
};

export const Layout = ({ title, children }: Props) => {
  const { status } = useSession();

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
        </>
      )}
    </div>
  );
};
