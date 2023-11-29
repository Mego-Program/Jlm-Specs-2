import React from "react";
import { Box, Typography } from "@mui/material";

function SpecTitle({ title }) {
  return (
    <Box>
      <Typography variant="h5">Title:</Typography>
      <Typography sx={{ fontFamily: "monospace" }}>{title}</Typography>{" "}
    </Box>
  );
}

export default SpecTitle;
