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
          admins: true,
        },
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User has no permission.",
      });
    }
  });

export const createMosque = protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
    })
  )
  .mutation(({ ctx, input }) => {
    const { user } = ctx.session;
    if (hasPermission(user, Actions.MOSQUE_CREATE)) {
      return ctx.prisma.mosque.create({
        data: {
          name: input.name,
        },
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User has no permission.",
      });
    }
  });

export const updateMosque = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().min(1),
      admins: z.string().array(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx.session;
    if (hasPermission(user, Actions.MOSQUE_UPDATE)) {
      const admins = await ctx.prisma.user.findMany({
        where: {
          id: {
            in: input.admins,
          },
        },
      });

      return ctx.prisma.mosque.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          admins: {
            set: admins,
          },
        },
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User has no permission.",
      });
    }
  });

export const deleteMosque = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(({ ctx, input }) => {
    const { user } = ctx.session;
    if (hasPermission(user, Actions.MOSQUE_DELETE)) {
      return ctx.prisma.mosque.delete({
        where: {
          id: input.id,
        },
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User has no permission.",
      });
    }
  });
