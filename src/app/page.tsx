"use client";

import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { trpcReact } from "@/trpc/trpcReact";
import Feed from "./components/Feed";

export default function Home() {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = trpcReact.getPosts.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <main>
      <Typography variant="h4" component={"h1"}>
        Posts
      </Typography>
      {data?.pages.map((page, pageIndex) => (
        <Feed key={pageIndex} posts={page.posts ?? []} />
      ))}
      <div ref={ref}>{isFetchingNextPage && <Typography>Loading more...</Typography>}</div>
    </main>
  );
}
