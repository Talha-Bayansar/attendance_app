import { Actions, hasPermission } from "@/auth";
import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../trpc";

export const getAll = protectedProcedure
  .input(
    z.object({
      query: z.string().optional(),
    })
  )
  .query(({ ctx, input }) => {
    const { user } = ctx.session;
    if (hasPermission(user, Actions.EVENT_READ)) {
      return ctx.prisma.user.findMany({
        where: {
          AND: [
            {
              role: {
                not: {
                  equals: Role.APP_ADMIN,
                },
              },
            },
            {
              OR: [
                {
                  name: {
                    contains: input.query,
                  },
                  email: {
                    contains: input.query,
                  },
                },
              ],
            },
          ],
        },
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User has no permission.",
      });
    }
  });
