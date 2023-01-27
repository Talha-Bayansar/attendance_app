import React from "react";
import { PuffLoader } from "react-spinners";

type Props = {
  isFullScreen?: boolean;
  className?: string;
};

export const LoadingIndicator = ({
  isFullScreen = false,
  className,
}: Props) => {
  const defaultClass = `grid place-content-center place-items-center ${
    className ?? ""
  }`;
  const fullScreenClass = `h-screen ${defaultClass}`;
  return (
    <div className={isFullScreen ? fullScreenClass : defaultClass}>
      <PuffLoader color="#9DC8A8" />
    </div>
  );
};
