import { Actions, hasPermission } from "@/auth";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../trpc";

export const getAllMosques = protectedProcedure
  .input(
    z.object({
      take: z.number().positive().optional(),
      query: z.string().optional(),
    })
  )
  .query(({ ctx, input }) => {
    const { user } = ctx.session;
    if (hasPermission(user, Actions.MOSQUE_READ)) {
      return ctx.prisma.mosque.findMany({
        where: {
          name: {
            contains: input.query,
          },
        },
        take: input.take,
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User has no permission.",
      });
    }
  });

export const getOneMosque = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(({ ctx, input }) => {
    const { user } = ctx.session;
    if (hasPermission(user, Actions.MOSQUE_READ)) {
      return ctx.prisma.mosque.findFirst({
        where: {
          AND: [
            {
              id: {
                equals: input.id,
              },
            },
          ],
        },
        include: {
          organisations: true,
        },
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User has no permission.",
      });
    }
  });
