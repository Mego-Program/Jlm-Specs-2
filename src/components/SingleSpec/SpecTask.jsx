import { Editor, EditorState, ContentState, convertFromRaw } from "draft-js";
import { Box, Button, List, ListItem, Stack, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import TaskItem from "../global/TaskItem";
import axios from "axios";
import { useEffect } from "react";
import FormDetails from "../Form/FormDetails";
import FormDialog from "../global/FormDialog";

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
    props.set({ ...props.info, task: {...props.info.task, tasks:props.info.task.tasks} });
    update();
  };
  function saveItem(item, index) {
    console.log(item);
    props.info.task.tasks[index] = item;
    props.set({ ...props.info, task: {...props.info.task, tasks:props.info.task.tasks} });
    update();
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5">Tasks:</Typography>
      <Box
        sx={{
          bgcolor: "secondary.light",
          padding: 2,
          borderRadius: 1,
          overflowY: "scroll",
          maxHeight: "30vh",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#f6c927",
            borderRadius: "6px",
          },
        }}
      >
        <Stack spacing={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <FormDialog  set={props.set} info={props.info}/> */}
            {props.info.task.projecName !== "" && (
              
              
              <Tooltip title={<Button sx={{height:20, color:'secondary.main', fontWeight:700, border:1, borderColor:'secondary.main'}}>Edit</Button>} placement='right'>
                <Typography
                sx={{
                  bgcolor: "secondary.main",
                  paddingY: 0.5,
                  paddingX: 1,
                  borderRadius: 1,
                  border: 1,
                  borderColor: "primary.main",
                }}
              >
                LinkTo: {props.info.task.projectName}
              </Typography>
              </Tooltip>
              
            )}
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
                spec={{title:props.info.title,id:props.info._id}}
                new={false}
              />
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
