import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

const SpecComments = ({ specId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: "", content: "" });
  const [newReply, setNewReply] = useState({ author: "", content: "" });
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
      setNewComment({ author: "", content: "" });
    } catch (error) {
      console.error("Error when adding comment:", error);
    }
  };

  const handleReplySubmit = async (commentId, replyTo) => {
    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/comments/${specId}/${commentId}/replies`;
      await axios.post(endpoint, newReply);
      setNewReply({ author: "", content: "" });
      fetchComments();
      setReplyFormOpen(null);
    } catch (error) {
      console.error("Error when adding reply:", error);
    }
  };

  return (
    <Box sx={{width:'100%'}}>
      {comments.map((comment, commentIndex) => (
        <Box
          key={comment._id}
          sx={{
            border: "1px solid #ccc",
            bgcolor:'secondary.dark',
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "16px",
            marginLeft: comment.replyTo ? "16px" : "0",
            borderBottom:2
          }}
        >
          <Typography sx={{borderBottom:1}}><strong>{comment.author}</strong>: {comment.content}</Typography>
          
          <Box sx={{ marginTop: "8px"}}>
            <Button
              variant="text"
              sx={{fontWeight:700}}
              onClick={() => setReplyFormOpen(commentIndex)}
            >
              Add Reply
            </Button>
            <Box sx={{bgcolor:'secondary.light', borderRadius:1, padding:1, marginLeft:8}}>
            {comment.replies && comment.replies.length > 0 && (
              <Box >
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
            </Box>

            {replyFormOpen !== null && replyFormOpen === commentIndex && (
              <Box sx={{ marginTop:2, marginLeft:8, bgcolor:'secondary.main', padding:2, borderRadius:1, display:'flex', justifyContent:'space-between'}}>
                <TextField
                  label="Author"
                  value={newReply.author}
                  onChange={(e) =>
                    setNewReply({ ...newReply, author: e.target.value })
                  }
                  rows={2}
                  sx={{marginRight:1, '& .MuiOutlinedInput-notchedOutline':{border:2, borderRadius:1}, '& label':{color:'info.main'}}}
                />
                <TextField
                  label="Content"
                  value={newReply.content}
                  onChange={(e) =>
                    setNewReply({ ...newReply, content: e.target.value })
                  }
                  multiline
                  rows={2}
                  sx={{flex:2, marginRight:1, '& .MuiOutlinedInput-notchedOutline':{border:2, borderRadius:1}, '& label':{color:'info.main'}}}
                />
                <Box sx={{display:'flex', alignItems:'end'}}>
                <Button
                  variant="outlined"
                  sx={{height:40, border:2, fontWeight:700, '&:hover':{border:2}}}
                  onClick={() => handleReplySubmit(comment._id, comment._id)}
                >
                  Add Reply
                </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    <Box sx={{display:'flex', alignItems:'start'}}>
      <TextField
        label="Your Name"
        value={newComment.author}
        onChange={(e) =>
          setNewComment({ ...newComment, author: e.target.value })
        }
        sx={{marginRight:1, '& .MuiOutlinedInput-notchedOutline':{border:2, borderColor:'primary.main', borderRadius:1}, '& label':{color:'primary.main'}}}
        />
      <TextField
        label="Your Comment"
        value={newComment.content}
        multiline
        rows={3}
        onChange={(e) =>
          setNewComment({ ...newComment, content: e.target.value })
        }
        sx={{flex:2, marginRight:1, '& .MuiOutlinedInput-notchedOutline':{border:2, borderColor:'primary.main', borderRadius:1}, '& label':{color:'primary.main'}}}
        />
      <Button variant="contained" sx={{fontWeight:700}} onClick={handleCommentSubmit}>
        Add A Comment
      </Button>
      </Box>
    </Box>
  );
};

export default SpecComments;
