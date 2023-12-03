import { Editor, EditorState, ContentState, convertFromRaw } from "draft-js";
import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import TaskItem from "../Form/TaskItem-old";
import Task from "../TaskItem";
import axios from "axios";
import { useEffect } from "react";

export default function SpecTask(props) {
  // useEffect(() => {
  //   axios.put(`${import.meta.env.VITE_API_URL}/specs/${props.info._id}`, {
  //     task: props.info.task,
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  const update = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/specs/${props.info._id}`,
        {
          task: props.info.task,
        }
      );
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  const delItem = async (index) => {
    const newlist = props.info.task[0].tasks.filter((item, id) => id !== index);
    props.info.task[0].tasks = newlist;
    props.set({ ...props.info, task: [props.info.task[0]] });
    update();
  };
  function saveItem(item, index) {
    props.info.task[0].tasks[index] = item;
    props.set({ ...props.info, task: [props.info.task[0]] });
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
            <Typography>add</Typography>
            {props.info.task[0].projecname !== "" && (
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
                LinkTo: {props.info.task[0].projectName}
              </Typography>
            )}
          </Box>
          {props.info.task[0].tasks.map((item, index) => {
            return (
              <Task board={props.info.task[0].projectName} item={item} index={index} save={saveItem} del={delItem} />
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
