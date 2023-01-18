import { Role } from "@prisma/client";
import type { User } from "@prisma/client";
import { Actions } from "../models";

const getAllEnumValues = (
  prefix = "MOSQUE" ||
    "ORGANISATION" ||
    "UNIT" ||
    "CATEGORY" ||
    "EVENT" ||
    "ALL"
) => {
  return Object.keys(Actions).filter((key) => {
    return prefix === "ALL"
      ? isNaN(Number(key))
      : isNaN(Number(key)) && key.includes(prefix);
  });
};

export const hasPermission = (user: Partial<User>, action) => {
  const appAdminActions = [...getAllEnumValues("ALL")];
  const mosqueAdminActions = [
    ...getAllEnumValues("ORGANISATION"),
    ...getAllEnumValues("UNIT"),
    ...getAllEnumValues("CATEGORY"),
    ...getAllEnumValues("EVENT"),
  ];
  const organisationActions = [
    ...getAllEnumValues("UNIT"),
    ...getAllEnumValues("CATEGORY"),
    ...getAllEnumValues("EVENT"),
  ];
  const unitActions = [
    ...getAllEnumValues("CATEGORY"),
    ...getAllEnumValues("EVENT"),
  ];
  const userActions = [];
  const permissions = new Map([
    [Role.APP_ADMIN, appAdminActions],
    [Role.MOSQUE_ADMIN, mosqueAdminActions],
    [Role.ORGANISATION_ADMIN, organisationActions],
    [Role.UNIT_ADMIN, unitActions],
    [Role.USER, userActions],
  ]);

  if (!user?.role) {
    return false;
  }

  if (permissions.has(user?.role)) {
    return permissions.get(user?.role).includes(action);
  }

  return false;
};
