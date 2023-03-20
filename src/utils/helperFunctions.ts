import { TRPCError } from "@trpc/server";

type PermissionHandlerProps<T> = {
  hasPermission: boolean;
  successCallback: () => T;
  errorCallback?: () => any;
};

export const permissionHandler = <T>({
  hasPermission,
  successCallback,
  errorCallback,
}: PermissionHandlerProps<T>) => {
  if (hasPermission) {
    return successCallback();
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
