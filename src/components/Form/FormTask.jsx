import React from "react";
import { Box } from "@mui/system";
import Divider from "@mui/material/Divider";
import TextEditor from "../TextEditor";
import { Button, Typography } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import AddIcon from "@mui/icons-material/Add";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw, ContentState } from "draft-js";

export default function FormTask(props) {
  const [state, setState] = React.useState(false);
  const [task, setTask] = React.useState(null);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const handleCancel = () => setState(false);

  const addTask = () => {
    if (task) {
      props.set({ ...props.info, task: [...props.info.task, task] });
      setTask(null);
      setState(false);
    }
  };

  const list = () => (
    <Box sx={{ bgcolor: "background.b1", width: "100vw" }} role="presentation">
      <Box sx={{ width: "80%", margin: "20vh auto 0" }}>
        <TextEditor set={setTask} info={task} />
      </Box>
      <Box
        sx={{
          width: "80%",
          margin: "20px auto 10vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={handleCancel}
          sx={{
            margin: 1,
            fontWeight: 700,
            "&:hover": { color: "background.b3", bgcolor: "primary.dark" },
          }}
          variant="contained"
          startIcon={<KeyboardBackspaceSharpIcon />}
        >
          cancel
        </Button>
        <Button
          sx={{
            margin: 1,
            fontWeight: 700,
            "&:hover": { color: "background.b3", bgcolor: "primary.dark" },
          }}
          variant="contained"
          startIcon={<DoneSharpIcon />}
          onClick={addTask}
        >
          Add task
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Box>
        <React.Fragment key={"top"}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            sx={{ fontWeight: 700, marginBottom: 2 }}
            onClick={toggleDrawer(true)}
          >
            New Task
          </Button>
          <SwipeableDrawer
            anchor={"top"}
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
        </React.Fragment>
      </Box>
      <Box>
        {/* {item.info.task.map((i) =>
          i.map((block, index) => {
            {
              return (
                <Box key={index}>
                  <Typography style={block.style}>{block.text}</Typography>
                  <Divider
                    sx={{ height: 1.5, borderRadius: 5 }}
                    color="#f6c927"
                    orientation="horizontal"
                    variant="fullWidth"
                  />
                </Box>
              );
            }
          })
        )} */}

        {props.info.task.map((item, index) => {
          const object = convertFromRaw(item);
          const html = stateToHTML(object);
          return (
            <Box key={index}>
              <Typography
                sx={{ wordWrap: "break-word" }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <Divider
                sx={{ height: 1.5, borderRadius: 5, marginY: 1 }}
                color="#f6c927"
                orientation="horizontal"
                variant="fullWidth"
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
