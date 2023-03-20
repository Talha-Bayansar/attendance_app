import { getOneUnit, createUnit } from "../services";
import { createTRPCRouter } from "../trpc";

export const unitRouter = createTRPCRouter({
  getOne: getOneUnit,
  create: createUnit,
});
