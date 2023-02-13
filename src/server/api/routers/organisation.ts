import { createOrganisation } from "../services";
import { createTRPCRouter } from "../trpc";

export const organisationRouter = createTRPCRouter({
  createOrganisation: createOrganisation,
});
