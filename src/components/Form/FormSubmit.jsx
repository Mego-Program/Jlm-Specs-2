import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const boxStyle = {
    bgcolor: "secondary.light",
    marginBottom: 1,
    borderRadius: 1,
    padding:1,
  
    "& label": {
      color: "info.main",
    },
  };

export default function FormSubmit(item) {
  console.log(item.info.deadLine);
  console.log(item.info.startLine);
  return (
    <Box >
      <Typography>Title</Typography>
      <Box sx={boxStyle}>
        {item.info.title}
      </Box>
      <Typography>Description</Typography>
      <Box sx={boxStyle}>
      {item.info.description}
      </Box>
      <Typography>Content</Typography>
      <Box sx={boxStyle}>
      {item.info.content}
      </Box>
      <Typography>Team</Typography>
      <Box sx={boxStyle}>
      {item.info.team}
      </Box>
      {item.info.date}
      {/* {item.info.deadLine} */}
    </Box>
  );
}
