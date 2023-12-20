import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import UserProfile from "../global/UserProfile";

const SpecComments = ({ specId }) => {
  const user = UserProfile;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    author: user.userName,
    content: "",
  });
  const [newReply, setNewReply] = useState({
    author: user.userName,
    content: "",
  });
  const [replyFormOpen, setReplyFormOpen] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${specId}`
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
        `${import.meta.env.VITE_API_URL}/comments/${specId}`,
        newComment
      );
      setComments(response.data);
      setNewComment({ ...newComment, content: "" });
    } catch (error) {
      console.error("Error when adding comment:", error);
    }
  };

  const handleReplySubmit = async (commentId) => {
    try {
      const endpoint = `${
        import.meta.env.VITE_API_URL
      }/comments/${specId}/${commentId}/replies`;
      await axios.post(endpoint, newReply);
      setNewReply({ ...newReply, content: "" });
      fetchComments();
      setReplyFormOpen(null);
    } catch (error) {
      console.error("Error when adding reply:", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5">Comments:</Typography>
      {comments.map((comment, commentIndex) => (
        <Box key={commentIndex}>
          <Box
            key={comment._id}
            sx={{
              marginTop: 2,
              border: 1,
              bgcolor: "secondary.light",
              borderRadius: "8px",
              padding: 2,
              marginLeft: comment.replyTo ? "16px" : "0",
              borderBottom: 4,
              borderColor: "primary.main",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={user.userName}
                src={user.img}
                sx={{ border: 2, borderColor: "primary.main" }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "primary.main", marginLeft: 1 }}
              >
                {comment.author}
              </Typography>
            </Box>
            <Typography sx={{ marginTop: 1, marginLeft: 6 }}>
              {comment.content}
            </Typography>
            <Box sx={{ marginTop: "8px" }}>
              <Button
                variant="text"
                sx={{
                  fontWeight: 700,
                  "&:hover": {
                    color: "info.main",
                    bgcolor: "secondary.light",
                  },
                }}
                onClick={() => {
                  setReplyFormOpen(commentIndex);
                  setNewReply({ ...newReply, content: "" });
                }}
              >
                Reply
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              borderLeft: 4,
              marginLeft: 4,
              borderColor: "primary.main",
              ...(replyFormOpen !== null || comment.replies.length > 0 && { paddingBottom: 2 }),            }}
          >
            {replyFormOpen !== null && replyFormOpen === commentIndex && (
              <Box sx={{ paddingTop: 2, paddingLeft: 2}}>
                <TextField
                  value={newReply.content}
                  placeholder="Your Comment"
                  multiline
                  rows={4}
                  onChange={(e) =>
                    setNewReply({ ...newReply, content: e.target.value })
                  }
                  sx={{
                    width: "100%",
                    bgcolor: "secondary.light",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: 2,
                      borderColor: "primary.main",
                    },
                    "& .MuiInputBase-root": { paddingBottom: 1 },
                    "& .MuiInputAdornment-root": { alignItems: "baseline" },
                    "& textarea": {
                      overflow: "hidden",
                      resize: "none",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="outlined"
                          sx={{
                            fontWeight: 700,
                            border: 2,
                            "&:hover": {
                              border: 2,
                              borderColor: "info.main",
                              color: "info.main",
                            },
                          }}
                          onClick={() => handleReplySubmit(comment._id)}
                        >
                          Reply
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
            {comment.replies && comment.replies.length > 0 && (
              <Box sx={{ paddingTop: 4, paddingLeft: 2 }}>
                <Box
                  sx={{
                    borderRadius: 1,
                    bgcolor: "secondary.light",
                    paddingBottom: 1,
                  }}
                >
                  {comment.replies.map((reply, replyIndex) => (
                    <Box
                      key={replyIndex}
                      sx={{
                        padding: 1,
                        borderBottom: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          alt={user.userName}
                          src={user.img}
                          sx={{ border: 2, borderColor: "primary.main" }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "primary.main",
                            marginLeft: 1,
                          }}
                        >
                          {reply.author}
                        </Typography>
                      </Box>
                      <Typography sx={{ marginTop: 1, marginLeft: 6 }}>
                        {reply.content}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ))}
      <Box sx={{ marginTop: 4 }}>
        <TextField
          value={newComment.content}
          placeholder="Your Comment"
          multiline
          rows={5}
          onChange={(e) =>
            setNewComment({ ...newComment, content: e.target.value })
          }
          sx={{
            width: "100%",
            bgcolor: "secondary.light",
            borderRadius: 1,
            "& .MuiInputBase-root": { padding: 1, paddingBottom: 0 },
            "& .MuiInputAdornment-root": { alignItems: "baseline" },
            "& textarea": {
              overflow: "hidden",
              resize: "none",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  sx={{ fontWeight: 700 }}
                  onClick={handleCommentSubmit}
                >
                  Add A Comment
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default SpecComments;
