import React, { useState } from "react";
import { Button, Card, Typography, TextField, Box, TextareaAutosize } from "@mui/material";
import { Close, Send, Edit } from "@mui/icons-material";
import { Post } from "../../types";
import { trpcReact } from "@/trpc/trpcReact";

const PostComponent: React.FC<Post> = ({ id, authorId, title, content, comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newContent, setNewContent] = useState(content ?? "");
  const [newTitle, setNewTitle] = useState(title ?? "");
  const [editMode, setEditMode] = useState(false);
  const utils = trpcReact.useUtils();

  const postCommentMutation = trpcReact.comment.create.useMutation();
  const deleteCommentMutation = trpcReact.comment.delete.useMutation();
  const updatePostMutation = trpcReact.post.update.useMutation();

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    postCommentMutation.mutate(
      { postId: `${id}`, content: newComment },
      {
        onSuccess: () => {
          utils.post.all.invalidate();
          setNewComment("");
        },
      }
    );
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate({ id }, { onSuccess: () => utils.post.all.invalidate() });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handlePostEdit = () => {
    updatePostMutation.mutate(
      {
        id,
        content: newContent,
        title: newTitle,
      },
      {
        onSuccess: () => {
          utils.post.all.invalidate();
          setNewContent("");
          setNewTitle("");
          setEditMode(false);
        },
      }
    );
  };

  return (
    <Card variant="outlined" sx={{ p: 2, my: 4 }}>
      <Typography component="h2" variant="h5">
        {editMode ? (
          <TextField
            sx={{ width: "80%", mb: 2 }}
            size="small"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          title
        )}
        {!editMode && (
          <Button onClick={handleEdit}>
            <Edit />
          </Button>
        )}
      </Typography>
      <Typography component="span" variant="body1">
        {editMode ? (
          <>
            <TextareaAutosize
              style={{ width: "80%" }}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <Button onClick={handlePostEdit}>Save</Button>
          </>
        ) : (
          content
        )}
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
              <Button onClick={handleDeleteComment} sx={{ position: "absolute", top: 0, right: 0 }}>
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
        <Button variant="contained" endIcon={<Send />} onClick={handleSubmitComment} disabled={!newComment.trim()}>
          Send
        </Button>
      </Box>
    </Card>
  );
};

export default PostComponent;
