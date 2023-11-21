import React from "react";
import TextEditor from "../TextEditor";

import { Box } from "@mui/system";
import { Button, Typography, Divider, SwipeableDrawer } from "@mui/material";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import { LocalizationProvider, DateField} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";


export default function FormTask(props) {
  const [disable, setDisable] = React.useState(false);
  const [state, setState] = React.useState(false);
  const [update, setUpdate] = React.useState(null);
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      convertFromRaw({
        blocks: [],
        entityMap: {},
      })
    )
  );




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
    const contentState = editorState.getCurrentContent();
    const contentObject = convertToRaw(contentState);
    if (contentObject.blocks[0].text !== "") {
      props.set({ ...props.info, task: [...props.info.task, contentObject] });
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw({
            blocks: [],
            entityMap: {},
          })
        )
      );
      setState(false);
    }
  };
  const updateTask = () => {
    const contentState = editorState.getCurrentContent();
    const contentObject = convertToRaw(contentState);
    if (contentObject.blocks[0].text !== "") {
      props.info.task[update] = contentObject
      props.set({...props.info, task: props.info.task})
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw({
            blocks: [],
            entityMap: {},
          })
        )
      );
      setState(false);
      setUpdate(null);
      setDisable(true)
    }
  };

  const list = () => (
    <Box sx={{ bgcolor: "background.b1", width: "100vw" }} role="presentation">
      <Box sx={{ width: "80%", margin: "20vh auto 0" }}>
        <TextEditor
          set={setEditorState}
          info={editorState}
          setDisable={setDisable}
        />
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
        {update !== null ? (
          <Button
            sx={{
              margin: 1,
              fontWeight: 700,
              "&:hover": { color: "background.b3", bgcolor: "primary.dark" },
            }}
            variant="contained"
            startIcon={<DoneSharpIcon />}
            disabled={disable}
            onClick={updateTask}
          >
            Update task
          </Button>
        ) : (
          <Button
            sx={{
              margin: 1,
              fontWeight: 700,
              "&:hover": { color: "background.b3", bgcolor: "primary.dark" },
            }}
            variant="contained"
            startIcon={<DoneSharpIcon />}
            disabled={disable}
            onClick={addTask}
          >
            Add task
          </Button>
        )}
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
      <Box sx={{ overflowY: "scroll", maxHeight: "40vh" }}>
        {props.info.task.map((item, index) => {
          const object = convertFromRaw(item);
          const html = stateToHTML(object);
          return (
            <Box key={index}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    paddingX: 1,
                    wordWrap: "break-word",
                    overflowX: "hidden",
                    overflowY: "scroll",
                    maxHeight: "20vh",
                  }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="en-gb"
                  >
                    <DateField
                      defaultValue={props.info.task[index].deadline}
                      onChange={(date) => {
                        props.info.task[index].deadline = date;
                      }}
                      label="Deadline"
                      sx={{
                        minWidth: "140px",
                        maxWidth: "140px",
                        maxHeight: "3.5rem",
                        borderRadius: 1,
                        marginX: 1,
                        marginTop: 1,
                        bgcolor: "secondary.light",
                        padding: 0,
                        "& label": {
                          color: "info.main",
                        },
                      }}
                    />
                  </LocalizationProvider>
                  <Box sx={{ display: "flex", flexDirection: "column"}}>
                    <Button
                      variant="outlined"
                      sx={{ height: 30 }}
                      onClick={() => {
                        const newList = props.info.task.filter(
                          (item, i) => i !== index
                        );
                        props.set({ ...props.info, task: newList });
                      }}
                    >
                      {" "}
                      <DeleteOutlineIcon sx={{ fontSize: 30 }} />
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ height: 30, marginTop: 1 }}
                      onClick={() => {
                        setUpdate(index)
                        setState(true);
                        setEditorState(
                          EditorState.createWithContent(
                            convertFromRaw(props.info.task[index])
                          )
                        );
                      }}
                      
                    >
                      {" "}
                      <EditIcon sx={{ fontSize: 24 }} />
                    </Button>
                  </Box>
                </Box>
              </Box>

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
