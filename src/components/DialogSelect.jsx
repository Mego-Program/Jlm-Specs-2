import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const status = ["ToDo", "In Progress", "Done"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          bgcolor: "background.b3",
          border: 1,
          borderColor: "background.y",
          borderBottom: 0,
        }}
      >
        Status
      </DialogTitle>
      <List
        sx={{
          pt: 0,
          bgcolor: "background.b3",
          border: 1,
          borderColor: "background.y",
          borderTop: 0,
        }}
      >
        {status.map((stat) => (
          <ListItem sx={{ paddingX: 3, '&:hover':{bgcolor:'background.b1'}}} disableGutters key={stat}>
            <ListItemButton onClick={() => handleListItemClick(stat)}>
              <ListItemText primary={stat} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(props.stat);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
        sx={{ color: "text.primary", fontWeight: 700, fontSize: 11 }}
        variant="text"
        onClick={handleClickOpen}
      >
        {selectedValue}{" "}
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
