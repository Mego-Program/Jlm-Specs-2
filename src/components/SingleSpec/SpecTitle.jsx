import { Editor, EditorState, ContentState, convertFromRaw } from "draft-js";
import {
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DescEditor from "../global/Editor/DescEditor";
import EditIcon from "@mui/icons-material/Edit";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

export default function SpecTitle(props) {
  const [edit, setEdit] = useState(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 1,
        }}
      >
        <Typography variant="h5">Title:</Typography>
        {edit ? (
          <Button
            variant="contained"
            startIcon={<DoneOutlinedIcon />}
            onClick={() => {
            //   setEdit(false);
            }}
            sx={{ fontWeight: 700 }}
          >
            Save
          </Button>
        ) : (
          <IconButton
            // onClick={() => setEdit(true)}
            sx={{
              border: 1,
              borderRadius: 1,
              borderColor: "primary.main",
              height: 30,
              paddingX: 2,
              "&:hover": {
                bgcolor: "secondary.light",
                border: 2,
                borderColor: "primary.main",
                translate: "1px",
              },
            }}
          >
            <EditIcon sx={{ color: "primary.main" }} />
          </IconButton>
        )}
      </Box>
      <Box
        sx={{
          padding: 2,
          bgcolor: "secondary.light",
          borderRadius: 1,
          maxHeight: "400px",
          overflowY: "scroll",
        }}
      >
        {edit ? (
          <Box sx={{ bgcolor: "secondary.main", borderRadius: 1 }}>
            <DescEditor set={props.set} info={props.info} />
          </Box>
        ) : (
          <Box sx={{minHeight:0}}>
          <Editor
            editorState={
              props.info && props.info.content
                ? EditorState.createWithContent(
                    convertFromRaw({
                      blocks: props.info.content.blocks,
                      entityMap: {},
                    })
                  )
                : EditorState.createEmpty()
            }
            readOnly
          />
          </Box>
        )}
      </Box>
    </Box>
  );
}
