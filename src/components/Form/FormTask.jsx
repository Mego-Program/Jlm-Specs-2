import {
  Autocomplete,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import FormDialog from "./FormDialog";
import TaskItem from "../global/TaskItem";

export default function FormTask(props) {
  // connect board and send task to project team
  // board connected only after spec submit
  // const [project, setProject] = useState(null);
  const [projectList, setProjectList] = useState([]);

  const CustomPaper = (props) => {
    return (
      <Paper
        elevation={5}
        sx={{
          border: 4,
          borderTop: 1,
          borderColor: "secondary.main",
          bgcolor: "secondary.light",
          padding: 0,
          "&::-webkit-scrollbar": {
            width: "6px",
          },

          " &::-webkit-scrollbar-thumb": {
            backgroundColor: "#f6c927",
            borderRadius: "6px",
          },
        }}
        {...props}
      />
    );
  };

  // get list of boards
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

  // connect board
  // useEffect(() => {
 
  // }, [project]);

  useEffect(() => {
    props.disabled(false)
    // if (props.info.task.tasks.length == 0) {
    //   props.disabled(true);
    // } else {
    //   props.disabled(false);
    // }
  }, [props.info.task]);

  function setBoard(event, board) {
    props.set({
      ...props.info,
      task: { ...props.info.task, projectName: board },
    });
  }

  function delItem(index) {
    const newlist = props.info.task.tasks.filter((item, id) => id !== index);
    props.set({ ...props.info, task: { ...props.info.task, tasks: newlist } });
  }
  function saveItem(item, index) {
    props.info.task.tasks[index] = item;
    props.set({
      ...props.info,
      task: { ...props.info.task, tasks: props.info.task.tasks },
    });
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <FormDialog set={props.set} info={props.info} />
        <Autocomplete
          sx={{
            width: "300px",
            "& input": {
              bgcolor: "secondary.light",
              height: 10,
              borderRadius: 1,
            },
            '& svg':{color:'primary.main'}
          }}
          value={props.info.task.projectName}
          options={projectList}
          PaperComponent={CustomPaper}
          onChange={setBoard}
          renderInput={(params) => {
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
                  "& svg": { color: "primary.light" },
                }}
                {...params}
                placeholder="Link a Project"
              />
            );
          }}
        />
      </Box>

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
          {props.info.task.tasks.length == 0 ? (
            <Typography> no task to display</Typography>
          ) : (
            <Box>
              {props.info.task.tasks.map((item, index) => {
                return (
                  <TaskItem
                    board={props.info.task.projectName}
                    item={item}
                    index={index}
                    save={saveItem}
                    del={delItem}
                    new={true}
                    key={index}
                  />
                );
              })}
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
