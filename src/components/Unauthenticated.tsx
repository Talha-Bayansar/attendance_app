import { t } from "@/locales";
import { Routes } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FcLock } from "react-icons/fc";

export const Unauthenticated = () => {
  const textArray = t.common.unauthenticatedErrorMessage.split(".");
  const router = useRouter();

  return (
    <div className="grid h-screen place-content-center place-items-center gap-2 p-4">
      <FcLock size={64} />
      <p className="text-center">
        {textArray[0]}.
        <Link
          href={`${Routes.SIGN_IN}?callbackUrl=${router.pathname}`}
          className="cursor-pointer text-blue-600"
        >
          {textArray[1]}.
        </Link>
      </p>
    </div>
  );
};
