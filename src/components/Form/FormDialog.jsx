import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { DateField } from "@mui/x-date-pickers";



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
    handleClose()
};

  const handleClose = () => {
    setData({header:'', content:'',deadline:null, sendToBoard:false})
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
              '& .MuiInputBase-root':{
                border: 2,
                borderBottom:4,
                borderColor: "primary.main",
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4,
                padding: 1,
                marginY:1,
                '&:hover':{borderColor:'info.main'}
              }
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
                borderTop: 4,
                borderBottom: 4,
                borderColor: "primary.main",
                paddingX: 1,
                '&:hover':{borderColor:'info.main'}
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
              borderTop: 4,
              borderColor: "primary.main",
              boxSizing: "border-box",
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              marginTop:2,
              '&:hover':{borderColor:'info.main'}
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
              <DateField
                sx={{
                  flex: 1.5,
                  border: 2,
                  borderColor: "secondary.light",
                  "&:hover": {
                    borderColor: "secondary.main",
                  }                  
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
