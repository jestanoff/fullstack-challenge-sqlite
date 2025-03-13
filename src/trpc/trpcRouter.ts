import { prismaClient } from "../../prisma/prismaClient";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

const t = initTRPC.create({
  transformer: superjson,
});

export const trpcRouter = t.router({
  // example endpoint...
  getPosts: t.procedure.input(z.object({
    limit: z.number().min(1).max(50).default(50),
    cursor: z.number().optional(),
  })).query(async ({ ctx, input }) => {
    const posts = await prismaClient.post.findMany({
      take: input.limit,
      skip: input.cursor ? 1 : 0,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      orderBy: { id: 'asc' },
    });

    const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;

    return { posts, nextCursor };
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
