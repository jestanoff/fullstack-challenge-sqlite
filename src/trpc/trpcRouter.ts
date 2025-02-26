import { prismaClient } from "../../prisma/prismaClient";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

const t = initTRPC.create({
  transformer: superjson,
});

export const trpcRouter = t.router({
  // example endpoint...
  getPosts: t.procedure.query(async ({ ctx, input }) => {
    return await prismaClient.post.findMany();
  }),
  getComment: t.procedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await prismaClient.comment.findMany({ where: { postId: Number(input.postId) } });
    }),
  postComment: t.procedure
    .input(z.object({ postId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await prismaClient.comment.create({
        data: {
          postId: Number(input.postId),
          content: input.content,
        },
      });
    }),
});

export type TrpcRouter = typeof trpcRouter;
