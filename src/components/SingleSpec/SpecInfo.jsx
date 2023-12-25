import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { EditButton } from "../global/btns";


function SpecInfo({ content, onSave, type, authorId}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onSave(editedContent, type);
    setIsEditing(false);
  };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "secondary.main",
//         padding: "16px",
//         marginBottom: "16px",
//         borderRadius: 2,
//         position: "relative",
//       }}
//     >
//       <Typography variant="h5">{type === "title" ? "Title:" : "Description:"}</Typography>
//       {isEditing ? (
//         <TextField
//           value={editedContent}
//           onChange={(e) => setEditedContent(e.target.value)}
//           fullWidth
//         />
//       ) : (
//         <Typography sx={{ fontFamily: "monospace" }}>{content}</Typography>
//       )}

//       {isEditing ? (
//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={handleSave}
//         >
//           Save
//         </Button>
//       ) : (
//         <Button
//           variant="outlined"
//           color="primary"
//           startIcon={<EditIcon />}
//           onClick={() => setIsEditing(true)}
//         />
//       )}
//     </Box>
//   );
// }

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
        <EditButton func={() => setIsEditing(true)} authorId = {authorId}/>

      )}
    </Box>
    <Box
    sx={{
      padding: 2,
      bgcolor: "secondary.light",
      borderRadius: 1,
      maxHeight: "400px",
      overflowY: "scroll",
    }}>
      {isEditing ? (
        <TextField
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          fullWidth
          autoFocus
          sx={{'& .MuiOutlinedInput-notchedOutline':{border:1}}}
        />
      ) : (
        <Typography>{content}</Typography>
      )}
    </Box>
  </Box>
);
      }

export default SpecInfo;
