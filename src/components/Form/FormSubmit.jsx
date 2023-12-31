import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { Editor, EditorState, convertFromRaw } from "draft-js";


const boxStyle = {
  bgcolor: "secondary.light",
  marginBottom: 1,
  borderRadius: 1,
  padding: 1,

  "& label": {
    color: "info.main",
  },
};


export default function FormSubmit(props) {
  return (
    <Box>
        <Box
          sx={{
            overflowY: "scroll",
            maxHeight: "45vh",
            paddingRight: 1,
            "&::-webkit-scrollbar": {
              width: "6px",
              border: 1,
              borderRadius: "6px",
              borderColor: "primary.main",
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "6px",
            },
          }}
        >
          <Typography>Title</Typography>
          <Box sx={boxStyle}>
            <Typography sx={{ fontFamily: "monospace" }}>
              {props.info.title}
            </Typography>
          </Box>
          <Typography>Description</Typography>
          <Box sx={boxStyle}>
            <Typography sx={{ fontFamily: "monospace" }}>
              {props.info.description}
            </Typography>
          </Box>
          <Typography>Content</Typography>
          <Box
            sx={{
              ...boxStyle,
              padding:2,
              minHeight:200,
              maxHeight: "350px",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "6px",
                borderRadius: "6px",
              },

              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "primary.main",
                borderRadius: "6px",
              },
            }}
          >
            <Editor
              editorState={EditorState.createWithContent(
                convertFromRaw(props.info.content)
              )}
              readOnly
            />
          </Box>
          <Typography>Team</Typography>
          <Box sx={boxStyle}>
            <Box >
              {props.info.team.map((user, index) => (
                <Typography sx={{color: "primary.main", fontSize:18, fontWeight:700, fontFamily:'monospace'}} key={index}>{user.userName}</Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Task</Typography>
            {props.info.task.projectName !== "" && (
              <Typography>Board: {props.info.task.projectName}</Typography>
            )}
          </Box>
          <Box
            sx={{
              ...boxStyle,
              overflowY: "scroll",
              maxHeight: 200,
              "&::-webkit-scrollbar": {
                width: "6px",
              },

              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#f6c927",
                borderRadius: "6px",
              },
            }}
          >
            {props.info.task.tasks.map((item, index) => {
              const date = dayjs(item.deadline);
              return (
                <Box
                  key={index}
                  sx={{
                    border: 2,
                    marginBottom: 0.3,
                    borderColor: "secondary.main",
                    borderStyle: "dashed",
                    borderRadius: 2,
                    paddingLeft: 1,
                  }}
                >
                  <Typography
                    color={"primary.main"}
                    variant="h5"
                    sx={{ fontWeight: 700 }}
                  >
                    {item.header}
                  </Typography>
                  <Typography color={"secondary.dark"}>
                    {item.content}
                  </Typography>
                  {item.deadline !== null && (
                    <Typography
                      color={"secondary.dark"}
                      sx={{ fontWeight: 700 }}
                    >
                      {date.$D}/{date.$M}/{date.$y}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
          <Typography>Time Line</Typography>
          <Box sx={boxStyle}>
            <Typography sx={{ fontFamily: "monospace" }}>
              {props.info.startDate.$D}/{props.info.startDate.$M + 1}/
              {props.info.startDate.$y} - {props.info.endDate.$D}/
              {props.info.endDate.$M + 1}/{props.info.endDate.$y}
            </Typography>
          </Box>
        </Box>
    </Box>
  );
}
