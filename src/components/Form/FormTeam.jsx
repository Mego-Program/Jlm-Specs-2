import * as React from "react";
import List from "@mui/material/List";
import Item from "./FormTeam/FormUser";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Tags from './FormTeam/FormListTeam'
import { AddBox } from "@mui/icons-material";

export default function FormTeam(props) {

  return (
    <Box>
    <Tags info={props.info} set={props.set}/>
    </Box>
  )
}