import { getOneUnit, createUnit, updateUnit, deleteUnit } from "../services";
import { createTRPCRouter } from "../trpc";

export const unitRouter = createTRPCRouter({
  getOne: getOneUnit,
  create: createUnit,
  update: updateUnit,
  deleteOne: deleteUnit,
});
