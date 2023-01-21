import React, { type ReactNode } from "react";

type Props = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  color?: "primary" | "secondary";
  children: ReactNode;
};

export const Button: React.FC<Props> = ({
  className,
  children,
  onClick,
  disabled = false,
  color = "primary",
}: Props) => {
  return (
    <button
      className={`bg-${color} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
