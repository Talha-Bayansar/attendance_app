import { getAll } from "../services";
import { createTRPCRouter } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: getAll,
});
