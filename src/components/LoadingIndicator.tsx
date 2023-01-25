import React from "react";
import { BounceLoader } from "react-spinners";

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
      <BounceLoader color="#9DC8A8" />
    </div>
  );
};
