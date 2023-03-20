import { createTRPCRouter } from "./trpc";
import {
  eventRouter,
  mosqueRouter,
  organisationRouter,
  unitRouter,
} from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  mosque: mosqueRouter,
  organisation: organisationRouter,
  unit: unitRouter,
  category: eventRouter,
  event: eventRouter,
  member: eventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
