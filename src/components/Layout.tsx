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
  const { data, status } = useSession();

  return (
    <div className="flex h-screen w-screen flex-col">
      {status === "loading" ? (
        <LoadingIndicator isFullScreen />
      ) : status === "unauthenticated" ? (
        <Unauthenticated />
      ) : (
        <>
          <AppBar>{title}</AppBar>
          {children}
        </>
      )}
    </div>
  );
};
