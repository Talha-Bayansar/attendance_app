import React from "react";
import { TfiFaceSad } from "react-icons/tfi";

type Props = {
  text: string;
  className?: string;
};

export const EmptyState = ({ text, className }: Props) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 text-center ${
        className ?? ""
      }`}
    >
      <TfiFaceSad size={40} />
      <p>{text}</p>
    </div>
  );
};
