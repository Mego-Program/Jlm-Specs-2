import * as React from "react";
import { Box, List } from "@mui/material";
import Item from "../../global/FormUser";

export default function TeamList(props) {
 

  return (
    <Box>
      {props.info.team.length > 0 ? (
        <List
          sx={{
            width: "100%",
            bgcolor: "secondary.light",
            borderRadius: 2,
            maxHeight: "30vh",
            overflow: "auto",
          }}
        >
          {props.info.team.map((user, index) => (
            <Item user={user} key={index} id={index} />
          ))}
        </List>
      ) : (
        <Box
          sx={{
            width: "100%",
            bgcolor: "secondary.light",
            borderRadius: 2,
            padding: 1,
            fontWeight: 700,
          }}
        >
          No users to display.
        </Box>
      )}
    </Box>
  );
}
