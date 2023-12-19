import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Autocomplete, Box, Button, Dialog, IconButton, Paper, TextField, Typography } from "@mui/material";
import {
  DateField,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// import CheckIcon from "@mui/icons-material/Check";
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function LinkTask(props) {
  const [open, setOpen] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [board, setBoard] = useState({
    spec:{ title: props.info.title, id: props.info._id },
    boardName: props.info.task.projectName,
    tasks: [Object],
    newSpec: false,
  });
  // const oldBoard = 

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/project/boards`)
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const newItem = async () => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/project/connect-board/${props.info.task.projectName}`, board);
        const updateList = props.info.task.tasks.map(item => ({ ...item, sendToBoard: false }))
        const newTask = {
          projectName:board.boardName,
          tasks: updateList
        }
        props.set({...props.info, task:newTask})
        closeDialog();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };



  function closeDialog() {
    setOpen(false);
  }

  const CustomPaper = (props) => {
    return (
      <Paper
        sx={{
          border: 4,
          borderTop: 1,
          borderColor: "secondary.main",
          bgcolor: "secondary.light",
          padding: 0,
        }}
        {...props}
      />
    );
  };


  return (
    <Box>
      <Button
        sx={{
          height: 20,
          color: "secondary.main",
          border: 1,
          borderColor: "secondary.main",
          bgcolor: "primary.main",
          "&:hover": { bgcolor: "primary.dark" },
        }}
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            bgcolor: "secondary.dark",
            border: 1,
            borderColor: "primary.main",
            borderRadius: 1,
          }}
        >
          <Typography>Link to Board</Typography>
          <Autocomplete
          sx={{
            width: "300px",
            "& input": {
              bgcolor: "secondary.light",
              height: 10,
              borderRadius: 1,
            },

          }}
          defaultValue={props.info.task.projectName}
          options={projectList}
          PaperComponent={CustomPaper}
          renderInput={(params) => {
            board.boardName = params.inputProps.value
            setBoard(board)
            return (
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 40,
                    border: 2,
                    borderColor: "secondary.light",
                    padding: 0,
                    paddingLeft: 1,
                  },
                  "& svg": { color: "secondary.light" },
                }}
                {...params}
                placeholder="Link a Project"
              />
            );
          }}
        />
          
        
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop:1}}>
            <IconButton
              sx={{
                paddingX: 1,
                borderRadius: 1,
                height: 35,
                "&:hover": { border: 1, borderColor: "primary.main" },
              }}
              onClick={closeDialog}
            >
              <KeyboardBackspaceIcon
                sx={{ color: "primary.main", fontSize: 36 }}
              />
            </IconButton>
             
              <IconButton
                sx={{
                  bgcolor: "primary.main",
                  paddingX: 2,
                  borderRadius: 1,
                  height: 35,
                  border: 2,
                  borderColor: "secondary.light",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
                onClick={newItem}
              >
                <CheckIcon sx={{ color: "secondary.main", fontSize: 24 }} />
              </IconButton>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
