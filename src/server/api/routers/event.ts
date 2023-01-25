import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  getAllBetween: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findMany({
        where: {
          Category: {
            Unit: {
              organisationId: {
                equals: ctx.session.user["organisationId"],
              },
            },
          },
          date: {
            gte: input.startDate,
            lte: input.endDate,
          },
        },
      });
    }),
});
