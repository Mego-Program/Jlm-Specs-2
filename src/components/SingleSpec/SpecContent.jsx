import { Editor, EditorState, convertFromRaw } from "draft-js";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import DescEditor from "../global/Editor/DescEditor";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { EditButton } from "../global/btns";

export default function SpecContent(props) {
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
        <Typography variant="h5">Content:</Typography>
        {edit ? (
          <Button
            variant="contained"
            startIcon={<DoneOutlinedIcon />}
            onClick={() => {
              setEdit(false);
            }}
            sx={{ fontWeight: 700 }}
          >
            Save
          </Button>
        ) : (
          <EditButton
            func={() => setEdit(true)}
            authorId={props.info.author._id}
          />
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
          <Box sx={{ minHeight: 150 }}>
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