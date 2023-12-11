import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Typography } from "@mui/material";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({header:'', content:'', deadline:null, sendToBoard:false});
  const [disable, setDisable] = React.useState(true);

  React.useEffect(() => {
    if(data.header !== '' && data.content !== '') {
      setDisable(false)
    }else{
      setDisable(true)
    }
  },[data])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    props.set({...props.info, task:{...props.info.task, tasks: [...props.info.task.tasks, data]}})
    console.log(data);
    handleClose()
};

  const handleClose = () => {
    setData({header:'', content:'',deadline:null})
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
            borderTopRightRadius:4,
            borderTopLeftRadius:4
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
            placeholder="Enter Title"
            sx={{
              "& input": {
                border: 2,
                borderColor: "primary.main",
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4,
                padding: 1,
              },
            }}
            onChange={(e) => {setData({...data, header: e.target.value})}}
          />
          <TextField
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
            onChange={(e) => {setData({...data, content: e.target.value})}}

          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginTop: 0.5,
              border: 2,
              borderColor: "primary.main",
              boxSizing: "border-box",
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          >
            <Typography
              sx={{
                flex: 1,
                fontSize: 26,
                fontWeight: 700,
                color: "primary.main",
                textAlign: "center",
              }}
            >
              Deadline:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <DatePicker
              
                sx={{
                  flex: 1.5,
                  border: 2,
                  borderColor: "secondary.light",
                  "&:hover": {
                    borderColor: "secondary.main",
                  },
                  '& .MuiButtonBase-root':{display:'none'}
                  
                  
                }}
                onChange={(e) => {setData({...data, deadline: e.$d})}}

                fullWidth
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "secondary.light",
            border: 1,
            borderColor: "background.y",
            borderTop: 0,
            borderBottomLeftRadius:4,
            borderBottomRightRadius:4,

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
            onClick={handleSubmit}
            disabled={disable}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
