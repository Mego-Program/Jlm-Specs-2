import { Box, bgcolor } from "@mui/system";
import Divider from "@mui/material/Divider";
import TextEditor from "../TextEditor";

export default function FormTask() {
  return (
    <Box>
      <Box>
        <TextEditor />
      </Box>
      <Divider
        sx={{ height: 1.5, borderRadius: 5 }}
        color="#f6c927"
        orientation="horizontal"
        variant="fullWidth"
      />
    </Box>
  );
}

