import React, { type ReactNode, useState } from "react";

type Props = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: ReactNode;
  type?: "button" | "reset" | "submit";
};

export const Button: React.FC<Props> = ({
  className,
  children,
  onClick,
  disabled = false,
  type,
}: Props) => {
  const [isTouching, setIsTouching] = useState<boolean>(false);

  return (
    <button
      onTouchStart={() => setIsTouching(true)}
      onTouchEnd={() => setIsTouching(false)}
      className={`w-full rounded-lg bg-secondary p-4 text-white shadow-small transition-all ${
        className || ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{
        transform: isTouching ? "scale(0.98)" : "scale(1)",
        boxShadow: isTouching && "none",
      }}
    >
      {children}
    </button>
  );
};
