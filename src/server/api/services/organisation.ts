import { Actions, hasPermission } from "@/auth";
import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../trpc";

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
