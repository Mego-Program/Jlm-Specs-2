import * as React from "react";
import List from "@mui/material/List";
import Item from "./FormContact";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import VirtualizedList from "./FormInfraConnect";

export default function FormTeam(props) {
  const [name, setName] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleTeam = () => {
    if (name.length > 0) {
      props.set({ ...props.info, team: [...props.info.team, name] });
      setName("");
    }
  };

  const delItem = (id) => {
    let newTeam = props.info.team.filter((item, index) => id !== index);
    props.set({ ...props, team: newTeam });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyItems: 'center', width: "50%" }}>
        {/* <TextField
          sx={{
            bgcolor: "secondary.light",
            marginY: 2,
            borderRadius: 1,

            width: "70%",
            "& label": {
              color: "info.main",
            },
          }}
          value={name}
          onChange={handleName}
          label="My Team"
          variant="filled"
        /> */}
        <VirtualizedList/>
      </Box>
      <Button
          onClick={handleTeam}
          variant="contained"
          sx={{ width: "50%", marginLeft: "22%",  bgcolor: "secondary.light", fontWeight: 700, borderRadius: 2, 
          marginY: 4}}>
          Add
        </Button>
    </Box>
  );
}
