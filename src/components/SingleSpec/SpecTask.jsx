import { Editor, EditorState, ContentState, convertFromRaw } from "draft-js";
import {
  Box,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import TaskItem from "../global/TaskItem";
import axios from "axios";

import { useState } from "react";
import NewTask from "./SpecTask/NewTask";
import LinkTask from "./SpecTask/LinkTask";

export default function SpecTask(props) {
  const update = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/specs/${props.info._id}`,
        {
          task: props.info.task,
        }
      );
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const delItem = async (index) => {
    const newlist = props.info.task.tasks.filter((item, id) => id !== index);
    props.info.task.tasks = newlist;
    props.set({
      ...props.info,
      task: { ...props.info.task, tasks: props.info.task.tasks },
    });
    update();
  };
  function saveItem(item, index) {
    props.info.task.tasks[index] = item;
    props.set({
      ...props.info,
      task: { ...props.info.task, tasks: props.info.task.tasks },
    });
    update();
  }

  function newItem() {}
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    header: "",
    content: "",
    deadline: null,
    sendToBoard: false,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5">Tasks:</Typography>
      <Box
        sx={{
          minHeight:150,
          marginTop:1,
          bgcolor: "secondary.light",
          padding: 2,
          borderRadius: 1,
          overflowY: "scroll",
          maxHeight: 300,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#f6c927",
            borderRadius: "6px",
          },

        }}
      >
        <Stack spacing={1} >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              zIndex:0,
            }}
          >
            <Tooltip
              title={<LinkTask info={props.info} set={props.set}/>}
              placement="right"
              PopperProps={{style:{zIndex:0}}}
            >
              <Typography
                sx={{
                  bgcolor: "secondary.main",
                  paddingY: 0.5,
                  paddingX: 1,
                  borderRadius: 1,
                  border: 1,
                  borderColor: "primary.main",
                  fontWeight: 700,
                  cursor: "context-menu",
                  '& .MuiPopper-root':{zIndex:0}

                }}
              >
                LinkTo: {props.info.task.projectName}
              </Typography>
            </Tooltip>
            <NewTask info={props.info} set={props.set}/>
          </Box>
          {props.info.task.tasks.map((item, index) => {
            return (
              <TaskItem
                key={index}
                board={props.info.task.projectName}
                item={item}
                index={index}
                save={saveItem}
                del={delItem}
                spec={{ title: props.info.title, id: props.info._id }}
                new={false}
              />
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
