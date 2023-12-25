import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";

import { Box, IconButton } from "@mui/material";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

 


  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    props.del(props.index);
    setOpen(false);
  };
 

  
  return (
    <React.Fragment>
      <IconButton sx={ props.iconSx} onClick={() => setOpen(true)}>
        <DeleteIcon sx={props.btnSx} />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          color={"primary.main"}
          bgcolor={"secondary.main"}
          sx={{
            border: 1,
            borderBottom: 0,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        >
          Are you sure you want to delete this {props.type}?
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "background.b1",
            borderRight: 1,
            borderLeft: 1,
            borderColor: "primary.main",
          }}
        >
          <DialogContentText
            margin={"10px 0"}
            color={"info.dark"}
            id="alert-dialog-description"
          >
            This action cannot be undone. Deleting this {props.type} will
            permanently remove it from the system.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "background.b1",
            border: 1,
            borderColor: "primary.main",
            borderTop: 0,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
