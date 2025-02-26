import { Post } from '@/types';
import { Box } from '@mui/material';
import React from 'react';
import PostComponent from './Post';

interface FeedProps {
  posts: Post[];
}

// export interface Post {
//   id: number;
//   title: string;
//   content: string | null;
//   published: boolean;
//   authorId: number | null;
// }

const Feed = ({ posts }: FeedProps) => {
  return (
    <Box component="section" sx={{ p: 2, width: 600, margin: "auto" }}>
      {posts.map(
        (post) =>
          post.published && (
            <PostComponent
              key={post.id}
              authorId={post.authorId}
              id={post.id}
              title={post.title}
              content={post.content}
            />
          )
      )}
    </Box>
  );
};

export default Feed;