import { Editor, EditorState, ContentState, convertFromRaw } from "draft-js";
import { Box, List, ListItem, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function SpecTasks(props) {

  return (
    <Box>
      <Typography variant="h5">Tasks:</Typography>
      <List>
        {props.tasks.map((task, index) => {

          const dateObject = dayjs(task.deadline)

          return (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: 1,
              }}
            >
              <Editor
                editorState={EditorState.createWithContent(
                  convertFromRaw({
                    blocks: task.blocks,
                    entityMap: {},
                  })
                )}
                readOnly
              />
              {task.deadline && (
                <Typography sx={{ fontFamily: "monospace" }}>
                  Deadline:
                  <br />
                  {dateObject.$D}/{dateObject.$M}/{dateObject.$y}
                </Typography>
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
