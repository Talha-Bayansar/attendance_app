import { useSession } from "next-auth/react";
import { LoadingIndicator } from "./LoadingIndicator";
import { Unauthenticated } from "./Unauthenticated";

export const Layout = ({ children }) => {
  const { data, status } = useSession();

  return (
    <div className="flex h-screen w-screen flex-col">
      {status === "loading" ? (
        <LoadingIndicator isFullScreen />
      ) : status === "unauthenticated" ? (
        <Unauthenticated />
      ) : (
        children
      )}
    </div>
  );
};
