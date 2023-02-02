import React from "react";
import { t } from "@/locales";
import { Routes } from "@/utils";
import Link from "next/link";
import { FcLock } from "react-icons/fc";

const Unauthorized = () => {
  const textArray = t.common.unauthorisedErrorMessage.split(".");

  return (
    <div className="grid h-screen place-content-center place-items-center gap-2 p-4">
      <FcLock size={64} />
      <p className="text-center">
        {textArray[0]}.
        <Link
          href={`${Routes.WAITING_ROOM}`}
          className="cursor-pointer text-blue-600"
        >
          {textArray[1]}.
        </Link>
      </p>
    </div>
  );
};

export default Unauthorized;
