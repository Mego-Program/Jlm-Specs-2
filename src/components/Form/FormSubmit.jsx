import { Typography } from "@mui/material";
import { Box } from "@mui/system";

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
      {props.info.title === "" ||
      props.info.team.length == 0 ||
      props.info.task.length == 0 ||
      props.info.startDate === null ||
      props.info.endDate === null ? (
        <Typography sx={{ fontFamily: "monospace" }}>
          Please fill up the form
          {props.disabled(true)}
        </Typography>
      ) : (
        <Box>
          {props.disabled(false)}
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
          <Typography>Team</Typography>
          <Box sx={boxStyle}>
            <Typography sx={{ fontFamily: "monospace" }}>
              {props.info.team.map((props, i) => (
                <span key={i}>{props} </span>
              ))}
            </Typography>
          </Box>
          {/* <Typography>Task</Typography>
          <Box sx={boxStyle}>
            <Typography sx={{ fontFamily: "monospace" }}>
              {props.info.task.map((props, i) => {
                const object = convertFromRaw(tsk);
                const html = stateToHTML(object);
                return (
                    <Typography
                      sx={{ wordWrap: "break-word" }}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />)
              })}
            </Typography>
          </Box> */}
          <Typography>Time Line</Typography>
          <Box sx={boxStyle}>
            <Typography sx={{ fontFamily: "monospace" }}>
              {props.info.startDate.$D}/{props.info.startDate.$M + 1}/
              {props.info.startDate.$y} - {props.info.endDate.$D}/
              {props.info.endDate.$M + 1}/{props.info.endDate.$y}
            </Typography>
          </Box>
        </Box>
      )}

    </Box>
  );
}
