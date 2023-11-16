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

export default function FormDetails(props) {
  
  const handleTitle = (e) => {
    props.set({ ...props.info, title: e.target.value });
  };
  const handleDesc = (e) => {
    props.set({ ...props.info, description: e.target.value });
  };

  return (
    <Box sx={{display:'flex', flexDirection:'column'}}>
      <TextField
        
        sx={inputStyle}
        label="Spec Title"
        variant="filled"
        onChange={handleTitle}
        value={props.info.title}
      />
      <TextField
        sx={inputStyle}
        label="Description"
        variant="filled"
        multiline
        rows={2}
        onChange={handleDesc}
        value={props.info.description}
      />

    </Box>
  );
}
