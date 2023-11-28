import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";


const componentStyle = {
  backgroundColor: "background.b2",
  padding: "16px",
  marginBottom: "16px",
  borderRadius: 2,
};

const CommentBox = ({ specId, onCommentAdded }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    author: "David", // Temporarly
    content: "",
  });

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/specs/${specId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [specId]);



  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/specs/${specId}/comments`, newComment);
      const savedComments = response.data.comments;
      setComments(savedComments);
      setNewComment({ author: "David", content: "" });
      onCommentAdded();
    } catch (error) {
      console.error("Error when adding comment:", error);
    }
  };

  return (
    <Box sx={{
      ...componentStyle,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
    }}>
      <Typography variant="h5">Comments:</Typography>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.author}</strong>: {comment.content}
          </li>
        ))}
      </ul>
      <TextField
        label="Your Name"
        value={newComment.author}
        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
        sx={{ marginRight: 2 }}
      />
      <TextField
        label="Your Comment"
        value={newComment.content}
        onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
        sx={{ marginRight: 2 }}
      />
      <Button variant="contained" onClick={handleCommentSubmit}>
        Add Comment
      </Button>
    </Box>
  );
};

export default CommentBox;
