import {
  createMosque,
  updateMosque,
  deleteMosque,
  getAllMosques,
  getOneMosque,
} from "../services";
import { createTRPCRouter } from "../trpc";

export const mosqueRouter = createTRPCRouter({
  getAllMosques: getAllMosques,
  getOneMosque: getOneMosque,
  createMosque: createMosque,
  updateMosque: updateMosque,
  deleteMosque: deleteMosque,
});
