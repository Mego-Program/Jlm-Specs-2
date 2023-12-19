import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

import DescEditor from "../global/Editor/DescEditor";

const inputStyle = {
  bgcolor: "secondary.light",
  marginBottom: 2,
  borderRadius: 1,
  "& input": {
    borderRadius: 1,
    border: 1,
    borderColor: "primary.main",
  },
  "& label": {
    color: "info.main",
  },
};

export default function FormDetails(props) {
  useEffect(() => {
    if (props.info.title === "" || props.info.content.blocks.length === 0) {
      props.fillPage(true);
    } else {
      if (props.info.content.blocks[0].text !== "") {
        props.fillPage(false);
      }else{
        props.fillPage(true)
      }
    }
  }, [props.info.title, props.info.content]);

  const handleTitle = (e) => {
    props.set({ ...props.info, title: e.target.value });
  };
  const handleDesc = (e) => {
    props.set({ ...props.info, description: e.target.value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        maxHeight: "48vh",
        paddingRight: 4,
      }}
    >
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
        placeholder="Short Description"
        onChange={handleDesc}
        value={props.info.description}
      />
      <DescEditor set={props.set} info={props.info} />
    </Box>
  );
}
