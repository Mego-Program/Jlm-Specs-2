import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { EditButton } from "../global/btns";

function SpecInfo({ content, type, authorId, set }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    set((prevSpecData) => ({
      ...prevSpecData,
      [type]: editedContent,
    }));
    setIsEditing(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 1,
        }}
      >
        <Typography variant="h5">
          {type === "title" ? "Title:" : "Description:"}
        </Typography>
        {isEditing ? (
          <Button
            variant="contained"
            startIcon={<DoneOutlinedIcon />}
            onClick={handleSave}
            sx={{ fontWeight: 700 }}
          >
            Save
          </Button>
        ) : (
          <EditButton func={() => setIsEditing(true)} authorId={authorId} />
        )}
      </Box>
      <Box
        sx={{
          padding: 2,
          bgcolor: "secondary.light",
          borderRadius: 1,
          maxHeight: "400px",
          overflowY: "scroll",
        }}
      >
        {isEditing ? (
          <TextField
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            fullWidth
            autoFocus
            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: 1 } }}
          />
        ) : (
          <Typography>{editedContent}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default SpecInfo;