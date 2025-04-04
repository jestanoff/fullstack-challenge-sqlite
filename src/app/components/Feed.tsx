import { Post } from "@/types";
import PostComponent from "./Post";

interface FeedProps {
  posts: Post[];
}

const Feed = ({ posts }: FeedProps) => {
  return (
    <>
      {posts.map(
        (post) =>
          post.published &&
          post.id && (
            <PostComponent
              key={post.id}
              authorId={post.authorId}
              id={post.id}
              title={post.title}
              content={post.content}
              comments={post.comments}
            />
          )
      )}
    </>
  );
};

export default Feed;
