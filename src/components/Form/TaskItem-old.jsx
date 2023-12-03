import dayjs from "dayjs";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import styled from "@emotion/styled";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export default function TaskItem(props) {
  const [date, setDate] = useState(dayjs(props.item.deadline));
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(props.item);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (item.title === "" || item.content === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [item]);

  const handleChangeTitle = (value) => {
    setItem({ ...item, title: value });
  };
  const handleChangeContent = (value) => {
    setItem({ ...item, content: value });
  };
  const handleChangeDate = (value) => {
    setDate(value);
    props.info.task.tasks[props.index].deadline = value;
    props.set({
      ...props.info,
      task: { ...props.info.task, tasks: props.info.task.tasks },
    });
  };
  const handleSave = () => {
    props.info.task.tasks[props.index] = item;
    props.set({
      ...props.info,
      task: { ...props.info.task, tasks: props.info.task.tasks },
    });
    setEdit(false);
  };

  return (
    <Item
      key={props.index}
      sx={{
        bgcolor: "secondary.main",
        color: "primary.main",
        display: "flex",
        justifyContent: "space-between",
        border: 1,
        borderColor: "primary.main",
        borderStyle: "dashed",
      }}
    >
      {edit ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            autoFocus
            defaultValue={item.title}
            variant="standard"
            sx={{
              bgcolor: "secondary.light",
              marginBottom: 0.2,
              "& input": { paddingX: 1 },
            }}
            onChange={(e) => {
              handleChangeTitle(e.target.value);
            }}
          />
          <TextField
            defaultValue={item.content}
            variant="standard"
            multiline
            rows={2}
            sx={{
              bgcolor: "secondary.light",
              "& textarea": {
                paddingX: 1,
                "&::-webkit-scrollbar": {
                  width: "6px",
                  border:'1px solid #f6c927',
                  borderRadius: "6px",

                },

                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#f6c927",
                  borderRadius: "6px",
                },
              },
            }}
            onChange={(e) => {
              handleChangeContent(e.target.value);
            }}
          />
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {" "}
            {props.item.title}
          </Typography>
          <Typography> {props.item.content}</Typography>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            {props.item.deadline !== null ? (
              <DateField
                variant="standard"
                value={date}
                sx={{ "& input": { color: "primary.main" } }}
                onChange={(newValue) => handleChangeDate(newValue)}
              />
            ) : (
              <DateField
                variant="standard"
                onChange={(newValue) => handleChangeDate(newValue)}
              />
            )}
          </LocalizationProvider>
        </Box>
      )}

      <Box>
        {edit ? (
          <IconButton onClick={handleSave} disabled={disable}>
            {disable ? (
              <DoneIcon sx={{ color: "secondary.light" }} />
            ) : (
              <DoneIcon sx={{ color: "primary.main" }} />
            )}
          </IconButton>
        ) : (
          <IconButton sx={{ display: "flex", flexDirection: "column" }}>
            <EditIcon
              onClick={() => {
                setEdit(true);
              }}
              sx={{
                color: "primary.main",
                border: 2,
                padding: 0.5,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                "&:hover": { bgcolor: "secondary.light" },
              }}
            />
            <DeleteIcon
              sx={{
                color: "primary.main",
                border: 2,
                padding: 0.5,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                "&:hover": { bgcolor: "secondary.light" },
              }}
              onClick={() => props.del(props.index)}
            />
          </IconButton>
        )}
      </Box>
    </Item>
  );
}
