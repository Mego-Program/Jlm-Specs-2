import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function SpecInfo({ content, onSave, type }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onSave(editedContent, type);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: 2,
        position: "relative",
      }}
    >
      <Typography variant="h5">{type === "title" ? "Title:" : "Description:"}</Typography>
      {isEditing ? (
        <TextField
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          fullWidth
        />
      ) : (
        <Typography sx={{ fontFamily: "monospace" }}>{content}</Typography>
      )}

      {isEditing ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => setIsEditing(true)}
        />
      )}
    </Box>
  );
}

export default SpecInfo;
