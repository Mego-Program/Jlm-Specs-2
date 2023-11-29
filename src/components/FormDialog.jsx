import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Typography } from "@mui/material";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={{ fontWeight: 700, height: 36 }}
        onClick={handleClickOpen}
      >
        New Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            bgcolor: "secondary.main",
            color: "primary.main",
            border: 1,
            borderColor: "background.y",
            borderBottom: 0,
          }}
        >
          New Task
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "secondary.light",
            borderRight: 1,
            borderLeft: 1,
            borderColor: "background.y",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Enter Header"
            sx={{
              "& input": {
                border: 2,
                borderColor: "primary.main",
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4,
                padding: 1,
              },
            }}
          />
          <TextField
            id="filled-multiline-static"
            multiline
            rows={4}
            fullWidth
            variant="standard"
            placeholder="Enter Content"
            sx={{
              "& .MuiInputBase-root": {
                border: 2,
                borderColor: "primary.main",
                paddingX: 1,
              },
            }}
          />
          <Box sx={{display:'flex', alignItems:'center', width:'100%', marginTop:1, border:2, borderColor:'primary.main', boxSizing:'border-box', borderBottomLeftRadius:4,  borderBottomRightRadius:4 }}>
            <Typography sx={{flex:1, fontSize:26, fontWeight:700, color:'primary.main', textAlign:'center'}}>Deadline:</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{flex:2, border:2, borderColor:'secondary.light', '&:hover':{ borderColor:'secondary.main', outline:4, boxSizing:'content-box'}}}  fullWidth/>
          </LocalizationProvider>
          </Box>
         
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "secondary.light",
            border: 1,
            borderColor: "background.y",
            borderTop: 0,
          }}
        >
          <Button
            startIcon={<KeyboardBackspaceSharpIcon />}
            variant="contained"
            onClick={handleClose}
            sx={{ fontWeight: 700 }}
          >
            Cancel
          </Button>
          <Button
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "secondary.main",
              color: "primary.main",
              fontWeight: 700,
              "&:hover": { color: "secondary.main" },
            }}
            variant="contained"
            onClick={handleClose}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
