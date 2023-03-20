import { TRPCError } from "@trpc/server";

type PermissionHandlerProps = {
  hasPermission: boolean;
  successCallback: () => any;
  errorCallback?: () => any;
};

export const permissionHandler = ({
  hasPermission,
  successCallback,
  errorCallback,
}: PermissionHandlerProps) => {
  if (hasPermission) {
    successCallback();
  } else {
    if (errorCallback) {
      errorCallback();
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User has no permission.",
      });
    }
  }
};
