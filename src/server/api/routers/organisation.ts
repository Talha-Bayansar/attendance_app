import {
  createOrganisation,
  deleteOrganisation,
  getOneOrganisation,
  updateOrganisation,
} from "../services";
import { createTRPCRouter } from "../trpc";

export const organisationRouter = createTRPCRouter({
  getOne: getOneOrganisation,
  createOrganisation: createOrganisation,
  updateOrganisation: updateOrganisation,
  deleteOne: deleteOrganisation,
});
