import { Actions, hasPermission } from "@/auth";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../trpc";

export const getAllBetween = protectedProcedure
  .input(
    z.object({
      startDate: z.date(),
      endDate: z.date(),
    })
  )
  .query(({ ctx, input }) => {
    const { user } = ctx.session;
    if (hasPermission(user, Actions.EVENT_READ)) {
      return ctx.prisma.event.findMany({
        where: {
          AND: [
            {
              Category: {
                Unit: {
                  OR: [
                    {
                      admins: {
                        some: {
                          id: {
                            equals: user.id,
                          },
                        },
                      },
                    },
                    {
                      Organisation: {
                        OR: [
                          {
                            admins: {
                              some: {
                                id: {
                                  equals: user.id,
                                },
                              },
                            },
                          },
                          {
                            Mosque: {
                              admins: {
                                some: {
                                  id: {
                                    equals: user.id,
                                  },
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
            {
              date: {
                gte: input.startDate,
                lte: input.endDate,
              },
            },
          ],
        },
        include: {
          attendees: true,
          Category: true,
        },
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User has no permission.",
      });
    }
  });
