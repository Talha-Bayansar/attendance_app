import { getAllMosques } from "../services";
import { createTRPCRouter } from "../trpc";

export const mosqueRouter = createTRPCRouter({
  getAllMosques: getAllMosques,
});
