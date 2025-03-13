import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Typography, TextField, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Post } from "../../types";
import { trpcReact } from "@/trpc/trpcReact";

const PostComponent: React.FC<Partial<Post>> = ({ id, authorId, title, content }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const commentsQuery = trpcReact.getComment.useQuery({ postId: `${id}` }, { enabled: !!id && isInView });
  const { data: comments } = commentsQuery;
  const postCommentMutation = trpcReact.postComment.useMutation();

  const handleSubmitComment = useCallback(() => {
    if (!newComment.trim()) return;
    postCommentMutation.mutate({ postId: `${id}`, content: newComment });
    setNewComment("");
  }, [id, newComment, postCommentMutation]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Card variant="outlined" sx={{ p: 2, my: 4 }}>
      <Typography component="h2" variant="h5">
        {title}
      </Typography>
      <Typography component="span" variant="body1">
        {content}
      </Typography>
      {comments && comments.length > 0 && (
        <div>
          <Button onClick={() => setShowComments((prev) => !prev)}>Comments ({comments.length})</Button>
        </div>
      )}
      {showComments && (
        <>
          {comments?.map((comment) => (
            <Card key={comment.id} variant="elevation" sx={{ p: 2, my: 4 }}>
              <Typography component="span" variant="body2">
                {comment.content}
              </Typography>
            </Card>
          ))}
        </>
      )}
      <Box sx={{ display: "flex", gap: 1, my: 2 }}>
        <TextField
          ref={ref}
          fullWidth
          size="small"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmitComment()}
        />
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmitComment} disabled={!newComment.trim()}>
          Send
        </Button>
      </Box>
    </Card>
  );
};

export default PostComponent;
