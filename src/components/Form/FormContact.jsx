import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function Item(item) {


  const delItem = () => {
    item.del(item.id)
  }

  return (
    <ListItem
      sx={{ display: "flex", alignItems: "center", borderBottom: 1 }}
      alignItems="flex-start"
    >
      <ListItemAvatar sx={{ margin: 0 }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText primary={item.name} />
      <Button sx={{fontSize:11}} onClick={delItem}>Delete</Button>