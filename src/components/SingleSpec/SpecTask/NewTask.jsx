import CheckIcon from "@mui/icons-material/Check";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Dialog, IconButton, TextField, Typography } from "@mui/material";
import {
  DateField,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import { useState } from "react";
import { AddButton } from "../../global/btns";

export default function NewTask(props) {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [task, setTask] = useState({
    header: "",
    content: "",
    deadline: null,
    sendToBoard: false,
  });

  useEffect(() => {
    if (task.header !== "" && task.content !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [task]);

  function newItem() {
    const newTasks = [...props.info.task.tasks, task];
    props.set({ ...props.info, task: { ...props.info.task, tasks: newTasks } });
    closeDialog();
  }

  function closeDialog() {
    setTask({
      header: "",
      content: "",
      deadline: null,
      sendToBoard: false,
    });
    setOpen(false);
  }

  const fieldStyle = {
    bgcolor: "secondary.light",
    borderRadius: 1,
    marginBottom: 1,
    "& input": { height: 35, padding: 0, paddingLeft: 1 },
  };

  return (
    <Box>
      <AddButton func={() => setOpen(true)} authorId={props.info.author._id} />


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
          <Typography>New Task</Typography>
          <TextField
            placeholder="Header"
            sx={fieldStyle}
            onChange={(e) => {
              setTask({ ...task, header: e.target.value });
            }}
          />
          <TextField
            placeholder="Content"
            sx={fieldStyle}
            onChange={(e) => {
              setTask({ ...task, content: e.target.value });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              sx={fieldStyle}
              onChange={(date) => {
                setTask({ ...task, deadline: date });
              }}
            />
          </LocalizationProvider>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            {disable ? (
              <IconButton
                sx={{
                  bgcolor: "secondary.light",
                  paddingX: 2,
                  borderRadius: 1,
                  height: 35,
                  border: 2,
                  borderColor: "secondary.light",
                  cursor: "not-allowed",
                  "&:hover": { bgcolor: "secondary.light" },
                }}
              >
                <CheckIcon sx={{ color: "secondary.main", fontSize: 24 }} />
              </IconButton>
            ) : (
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
            )}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
