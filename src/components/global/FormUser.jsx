import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AlertDialog from "./AlertDialog";

export default function Item(props) {
  const delItem = () => {
    props.del(props.id);
  };

  return (
    <ListItem
      sx={{ display: "flex", alignItems: "center", borderBottom: 1 }}
      alignItems="flex-start"
    >
      <Avatar alt={props.user.userName} src={props.user.img} sx={{ bgcolor: "primary.main", border: 2, marginRight:2, width: 56, height: 56}}/>
      <ListItemText primary={props.user.userName} />
      {props.del && (
        <AlertDialog
        del={props.del}
        index={props.id}
        iconSx={{paddingTop:0}}
        btnSx={{
          color: "primary.main",
          border: 2,
          padding: 0.5,
          width: 50,
          height: 35,
          borderRadius: 1,
          borderColor:'secondary.light',
          "&:hover": { bgcolor: "secondary.light", borderColor:'primary.main' },
        }}
      />
      )}
    </ListItem>
  );
}
