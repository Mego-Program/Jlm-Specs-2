import * as React from "react";
import List from "@mui/material/List";
import Item from "./FormContact";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function FormTeam(item) {
  const [name, setName] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleTeam = () => {
    if (name.length > 0) {
      item.set({ ...item.info, team: [...item.info.team, name] });
      setName("");
    }
  };

  const delItem = (id) => {
    let newTeam = item.info.team.filter((item, index) => id !== index )
    item.set({...item, team: newTeam})
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>

        <TextField
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
        />
        <Button
          onClick={handleTeam}
          variant="contained"
          sx={{ marginX: 2, marginY: 3, fontWeight: 700 }}
        >
          Add
        </Button>
      </Box>
      <List sx={{ width: "100%", bgcolor: "secondary.light", borderRadius: 2 }}>
        {item.info.team.map((i, index) => (
          <Item name={i} key={index} id={index} del={delItem} />
        ))}

      </List>
    </Box>
  );
}
