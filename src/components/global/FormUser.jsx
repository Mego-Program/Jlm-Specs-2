import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export default function Item(props) {
  const delItem = () => {
    props.del(props.id)
  };

  return (
    <ListItem
      sx={{ display: "flex", alignItems: "center", borderBottom: 1 }}
      alignItems="flex-start"
    >
      <ListItemAvatar sx={{ margin: 0 }}>
        <Avatar alt="Remy Sharp" src="" />
      </ListItemAvatar>
      <ListItemText primary={props.name} />
      {props.del && 
      <Button sx={{ fontSize: 11 }} onClick={delItem}>
        Delete
      </Button>
      }
    </ListItem>
  );
}
