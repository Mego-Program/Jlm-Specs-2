import React from "react";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import Item from "../global/FormUser";
import { Edit } from "@mui/icons-material";
import SpecItemTeam from "./SpecTeam/SpecItemTeam";

function SpecTeam(props) {
  const delItem = (id) => {
    let newTeam = props.info.team.filter((item, index) => id !== index);
    console.log(newTeam);
    props.set({ ...props.info, team: newTeam });
  };

  return (
    <Box>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Typography variant="h5">Team:</Typography>
        <SpecItemTeam set={props.set} info={props.info}/>
      </Box>
      <List sx={{ bgcolor: "secondary.light", borderRadius: 1, marginTop: 1 }}>
        {props.info.team.map((user, index) => (
          <Item user={user} key={index} id={index} del={delItem} authorId={props.info.author._id} />
        ))}
      </List>
    </Box>
  );
}

export default SpecTeam;
