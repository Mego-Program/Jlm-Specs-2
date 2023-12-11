import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import DescEditor from "../DescEditor";

const inputStyle = {
  bgcolor: "secondary.light",
  marginBottom: 0.5,
  borderRadius: 1,
  "& input": {
    borderRadius: 1,
    border: 1,
    borderColor: "primary.main",
    height:4,

  },
  "& label": {
    color: "info.main",
  },
};

export default function FormDetails(props) {
  const handleTitle = (e) => {
    props.set({ ...props.info, title: e.target.value });
  };
  const handleDesc = (e) => {
    props.set({ ...props.info, description: e.target.value });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        sx={inputStyle}
        variant="outlined"
        placeholder="Spec Title"
        onChange={handleTitle}
        value={props.info.title}
      />
      <TextField
        sx={inputStyle}
        variant="outlined"
        placeholder="Spec Description"
        onChange={handleDesc}
        value={props.info.description}
      />
      <DescEditor set={props.set} info={props.info} />
    </Box>
  );
}
