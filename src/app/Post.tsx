import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Typography } from "@mui/material";
import { Post, Comment } from "../types";

const PostComponent: React.FC<Partial<Post>> = ({ id, authorId, title, content }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
      setComments(await response.json());
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <Card variant="outlined" sx={{ p: 2, my: 4 }}>
      <Typography component="h2" variant="h5">
        {title}
      </Typography>
      <Typography component="span" variant="body1">
        {content}
      </Typography>
      {comments.length > 0 && (
        <div>
          <Button onClick={() => setShowComments((prev) => !prev)}>Comments ({comments.length})</Button>
        </div>
      )}
      {showComments &&
        comments.map((comment) => (
          <Card key={comment.id} variant="elevation" sx={{ p: 2, my: 4 }}>
            <Typography component="span" variant="body2">
              {comment.content}
            </Typography>
          </Card>
        ))}
    </Card>
  );
};

export default PostComponent;