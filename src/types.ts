export interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number | null;
}

export interface Comment {
  id: number;
  content: string;
  post: Post;
  postId: number;
}
