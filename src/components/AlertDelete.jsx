import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    props.del()
    setOpen(false);
  
  };

  return (
    <React.Fragment>
      <Button
        margin="0"
        padding="0"
        onClick={handleClickOpen}
        //   onClick={delSpec}
        sx={{ color: "text.primary", fontSize: 11, fontWeight: 700 }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle color={"primary.main"} bgcolor={'secondary.main'} sx={{border:1, borderBottom:0, borderTopLeftRadius:4, borderTopRightRadius:4}}>
          Are you sure you want to delete this item?
        </DialogTitle>
        <DialogContent sx={{bgcolor:'background.b1', borderRight:1, borderLeft:1, borderColor:'primary.main'}}>
          <DialogContentText margin={'10px 0'} color={'info.dark'}  id="alert-dialog-description">
            This action cannot be undone. Deleting this item will permanently
            remove it from the system.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{bgcolor:'background.b1', border:1, borderColor:'primary.main', borderTop:0, borderBottomLeftRadius:4, borderBottomRightRadius:4}}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
