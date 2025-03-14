import React, { useCallback, useState } from "react";
import { Button, Card, Typography, TextField, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Close } from "@mui/icons-material";
import { Post, Comment } from "../../types";
import { trpcReact } from "@/trpc/trpcReact";

const PostComponent: React.FC<Partial<Post>> = ({ id, authorId, title, content, comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const utils = trpcReact.useUtils();

  const postCommentMutation = trpcReact.postComment.useMutation();
  const deleteCommentMutation = trpcReact.deleteComment.useMutation();

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    postCommentMutation.mutate(
      { postId: `${id}`, content: newComment },
      {
        onSuccess: () => {
          utils.getPosts.invalidate();
          setNewComment("");
        },
      }
    );
  };

  const handleDeleteComment = (id: number) => {
    deleteCommentMutation.mutate(
      { id },
      {
        onSuccess: () => {
          utils.getPosts.invalidate();
        },
      }
    );
  };

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
            <Card key={comment.id} variant="elevation" sx={{ p: 2, pr: 8, my: 4, position: "relative" }}>
              <Typography component="span" variant="body2">
                {comment.content}
              </Typography>
              <Button onClick={() => handleDeleteComment(comment.id)} sx={{ position: "absolute", top: 0, right: 0 }}>
                <Close />
              </Button>
            </Card>
          ))}
        </>
      )}
      <Box sx={{ display: "flex", gap: 1, my: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmitComment} disabled={!newComment.trim()}>
          Send
        </Button>
      </Box>
    </Card>
  );
};

export default PostComponent;
