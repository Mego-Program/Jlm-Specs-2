import { TextField } from "@mui/material";
import { Box } from "@mui/system";

const inputStyle = {
  bgcolor: "secondary.light",
  margin:1,
  borderTopLeftRadius:4,
  borderTopRightRadius:4,
  borderBottomRightRadius:2,
  borderBottomLrftRadius:2,
  "& label": {
    color: "info.main",
  }
};

export default function FormDetails(item) {
  
  const handleTitle = (e) => {
    item.set({ ...item.info, title: e.target.value });
  };
  const handleDesc = (e) => {
    item.set({ ...item.info, description: e.target.value });
  };

  return (
    <Box sx={{display:'flex', flexDirection:'column'}}>
      <TextField
        
        sx={inputStyle}
        label="Spec Title"
        variant="filled"
        onChange={handleTitle}
        value={item.info.title}
      />
      <TextField
        sx={inputStyle}
        label="Description"
        variant="filled"
        multiline
        rows={2}
        onChange={handleDesc}
        value={item.info.description}
      />

    </Box>
  );
}
