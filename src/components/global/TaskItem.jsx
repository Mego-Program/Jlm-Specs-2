import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useState, useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

import styled from "@emotion/styled";
import {
  Box,
  Fab,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";

import AlertDialog from "./AlertDialog";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export default function TaskItem(props) {
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(props.item);
  const [disable, setDisable] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (item.title === "" || item.content === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [item]);

  const handleChangeTitle = (value) => {
    setItem({ ...item, header: value });
  };
  const handleChangeContent = (value) => {
    setItem({ ...item, content: value });
  };
  const handleChangeDate = (value) => {
    item.deadline = value;
    props.save(item, props.index);
  };
  const handleSave = () => {
    props.save(item, props.index);
    setEdit(false);
  };

  const sendToBoard = async () => {
    if (!props.new) {
      console.log(props.item.sendToBoard);
      if (!props.item.sendToBoard) {
        try {
          item.sendToBoard = true;
          const obj = {
            spec: props.spec,
            boardName: props.board,
            tasks: [item],
            newSpec: false,
          };
          console.log(obj);
          const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/project/add-task`,
            obj
          );
          // console.log(response.data);
          console.log('test');
          props.save(item, props.index);
        } catch (error) {
          console.log('test err');
          console.log(error);
          item.sendToBoard = false;
        }
      }
    } else {
      if (item.sendToBoard === false) {
        item.sendToBoard = true;
      } else {
        item.sendToBoard = false;
      }
      props.save(item, props.index);
    }
  };

  return (
    <Box key={props.index} sx={{ display: "flex", alignItems: "center" }}>
      <Item
        sx={{
          bgcolor: "secondary.main",
          color: "primary.main",
          display: "flex",
          justifyContent: "space-between",
          border: 1,
          borderColor: "primary.main",
          borderStyle: "dashed",
          flex: 10,
        }}
      >
        {edit ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              autoFocus
              defaultValue={item.header}
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
                    border: "1px solid #f6c927",
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
              {props.item.header}
            </Typography>
            <Typography> {props.item.content}</Typography>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              {props.item.deadline !== null ? (
                <DateField
                  variant="standard"
                  value={dayjs(props.item.deadline)}
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
                onClick={() => setAlert(true)}
              />
              <AlertDialog
                open={alert}
                setOpen={setAlert}
                del={props.del}
                index={props.index}
              />
            </IconButton>
          )}
        </Box>
      </Item>
      {props.board !== "" && (
        <Fab
          size="medium"
          sx={{
            marginLeft: 1,
            textAlign: "center",
            bgcolor: "secondary.main",
            "&:hover": { bgcolor: "secondary.light" },
          }}
          onClick={sendToBoard}
        >
          {props.item.sendToBoard ? (
            <MarkEmailReadOutlinedIcon
              sx={{ fontSize: 24, color: "primary.main" }}
            />
          ) : (
            <ForwardToInboxOutlinedIcon
              sx={{ fontSize: 24, color: "primary.main" }}
            />
          )}
        </Fab>
      )}
    </Box>
  );
}
