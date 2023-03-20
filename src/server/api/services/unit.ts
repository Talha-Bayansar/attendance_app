import { Actions, hasPermission } from "@/auth";
import { permissionHandler } from "@/utils";
import { Role } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure } from "../trpc";

export const getOneUnit = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(({ ctx, input }) => {
    const { user } = ctx.session;
    permissionHandler({
      hasPermission: hasPermission(user, Actions.UNIT_READ),
      successCallback: () => {
        return ctx.prisma.unit.findFirst({
          where: {
            id: input.id,
          },
        });
      },
    });
  });

export const createUnit = protectedProcedure
  .input(
    z.object({
      organisationId: z.string(),
      name: z.string().min(1),
      admins: z.string().array(),
    })
  )
  .mutation(({ ctx, input }) => {
    const { user } = ctx.session;
    permissionHandler({
      hasPermission: hasPermission(user, Actions.UNIT_READ),
      successCallback: async () => {
        if (user.role !== Role.APP_ADMIN) {
          await ctx.prisma.organisation.findFirstOrThrow({
            where: {
              AND: [
                {
                  id: input.organisationId,
                },
                {
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
              ],
            },
          });
        }
        return ctx.prisma.unit.create({
          data: {
            organisationId: input.organisationId,
            name: input.name,
          },
        });
      },
    });
  });
