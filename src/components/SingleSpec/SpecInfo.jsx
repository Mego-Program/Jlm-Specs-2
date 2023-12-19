import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function SpecInfo({
  title,
  description,
  onSaveTitle,
  onSaveDescription,
}) {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSaveTitle(editedTitle);
    onSaveDescription(editedDescription);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.b2",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: 2,
        position: "relative",
      }}
    >
      <Box sx={{ marginBottom: "16px" }}>
        <Typography variant="h5">Title:</Typography>
        {isEditing ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            fullWidth
          />
        ) : (
          <Typography sx={{ fontFamily: "monospace" }}>{title}</Typography>
        )}
      </Box>

      <Box sx={{ marginBottom: "16px" }}>
        <Typography variant="h5">Description:</Typography>
        {isEditing ? (
          <TextField
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            fullWidth
            multiline
          />
        ) : (
          <Typography sx={{ fontFamily: "monospace" }}>{description}</Typography>
        )}
      </Box>

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
        >
          
        </Button>
      )}
    </Box>
  );
}

export default SpecInfo;