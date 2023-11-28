import React from 'react';
import {Box, Typography} from "@mui/material"

function SpecDescription({ description }) {
  return (
    <Box>
      <Typography variant="h5">Description:</Typography>
      <Typography sx={{ fontFamily: "monospace" }}>{description}</Typography>{" "}
    </Box>
  );
}

export default SpecDescription;
