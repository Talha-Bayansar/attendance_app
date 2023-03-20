import { Actions, hasPermission } from "@/auth";
import { permissionHandler } from "@/utils";
import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../trpc";

export const getOneOrganisation = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(({ ctx, input }) => {
    const { user } = ctx.session;
    if (hasPermission(user, Actions.ORGANISATION_READ)) {
      return ctx.prisma.organisation.findFirst({
        where: {
          id: {
            equals: input.id,
          },
        },
        include: {
          units: true,
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

export const createOrganisation = protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
      mosqueId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx.session;
    if (hasPermission(user, Actions.ORGANISATION_CREATE)) {
      if (user.role !== Role.APP_ADMIN) {
        const mosque = await ctx.prisma.mosque.findFirst({
          where: {
            AND: [
              {
                id: {
                  equals: input.mosqueId,
                },
              },
              {
                admins: {
                  some: {
                    id: {
                      equals: user.id,
                    },
                  },
                },
              },
            ],
          },
        });

        if (!mosque) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User has no permission.",
          });
        }
      }
      return ctx.prisma.organisation.create({
        data: {
          name: input.name,
          mosqueId: input.mosqueId,
        },
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User has no permission.",
      });
    }
  });

export const updateOrganisation = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().min(1),
      admins: z.string().array(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx.session;
    permissionHandler({
      hasPermission: hasPermission(user, Actions.ORGANISATION_UPDATE),
      successCallback: async () => {
        if (user.role !== Role.APP_ADMIN) {
          const organisation = await ctx.prisma.organisation.findFirst({
            where: {
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
          });

          if (!organisation) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "User has no permission.",
            });
          }
        }
        return ctx.prisma.organisation.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
          },
        });
      },
    });
  });

export const deleteOrganisation = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx.session;
    permissionHandler({
      hasPermission: hasPermission(user, Actions.ORGANISATION_DELETE),
      successCallback: async () => {
        if (user.role !== Role.APP_ADMIN) {
          await ctx.prisma.organisation.findFirstOrThrow({
            where: {
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
          });
        }

        return ctx.prisma.organisation.delete({
          where: {
            id: input.id,
          },
        });
      },
    });
  });
