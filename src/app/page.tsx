"use client";

import { Typography } from "@mui/material";
import { trpcReact } from "@/trpc/trpcReact";
import Feed from "./components/Feed";

export default function Home() {
  const { data: posts } = trpcReact.getPosts.useQuery();

  return (
    <main>
      <Typography variant="h4" component={"h1"}>
        Posts
      </Typography>
      <Feed posts={posts ?? []} />
    </main>
  );
}
