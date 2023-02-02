import { getAllBetween } from "../services";
import { createTRPCRouter } from "../trpc";

export const eventRouter = createTRPCRouter({
  getAllBetween: getAllBetween,
});
