import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";

const SpecComments = ({ specId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: "", content: "" });
  const [newReply, setNewReply] = useState({ author: "", content: "" });
  const [replyFormOpen, setReplyFormOpen] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/specs/${specId}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [specId]);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/specs/${specId}/comments`,
        newComment
      );
      setComments(response.data);
      setNewComment({ author: "", content: "" });
    } catch (error) {
      console.error("Error when adding comment:", error);
    }
  };

  const handleReplySubmit = async (commentId, replyTo) => {
    try {
      const endpoint = `http://localhost:4000/specs/${specId}/comments/${commentId}/replies`;
      await axios.post(endpoint, newReply);
      setNewReply({ author: "", content: "" });
      fetchComments();
      setReplyFormOpen(null);
    } catch (error) {
      console.error("Error when adding reply:", error);
    }
  };

  return (
    <Box>
      {comments.map((comment, commentIndex) => (
        <Box
          key={commentIndex}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "16px",
            marginLeft: comment.replyTo ? "16px" : "0",
          }}
        >
          <strong>{comment.author}</strong>: {comment.content}
          <Box sx={{ marginTop: "8px" }}>
            <Button
              variant="outlined"
              onClick={() => setReplyFormOpen(commentIndex)}
            >
              Add Reply
            </Button>

            {comment.replies && comment.replies.length > 0 && (
              <Box sx={{ marginLeft: "16px", marginTop: "8px" }}>
                {comment.replies.map((reply, replyIndex) => (
                  <Box
                    key={replyIndex}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "8px",
                      marginTop: "8px",
                    }}
                  >
                    <strong>{reply.author}</strong>: {reply.content}
                  </Box>
                ))}
              </Box>
            )}

            {replyFormOpen !== null && replyFormOpen === commentIndex && (
              <Box sx={{ marginTop: "8px", marginLeft: "16px" }}>
                <TextField
                  label="Author"
                  value={newReply.author}
                  onChange={(e) =>
                    setNewReply({ ...newReply, author: e.target.value })
                  }
                  multiline
                  rows={2}
                  sx={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Content"
                  value={newReply.content}
                  onChange={(e) =>
                    setNewReply({ ...newReply, content: e.target.value })
                  }
                  multiline
                  rows={2}
                  sx={{ marginBottom: "8px" }}
                />
                <Button
                  variant="outlined"
                  onClick={() => handleReplySubmit(comment._id, comment._id)}
                >
                  Add Reply
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      ))}

      <TextField
        label="Your Name"
        value={newComment.author}
        onChange={(e) =>
          setNewComment({ ...newComment, author: e.target.value })
        }
        sx={{ marginRight: 2 }}
      />
      <TextField
        label="Your Comment"
        value={newComment.content}
        onChange={(e) =>
          setNewComment({ ...newComment, content: e.target.value })
        }
        sx={{ marginRight: 2 }}
      />
      <Button variant="contained" onClick={handleCommentSubmit}>
        Add A Comment
      </Button>
    </Box>
  );
};

export default SpecComments;
