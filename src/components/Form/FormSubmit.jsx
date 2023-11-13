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

export default function FormSubmit(item) {
  return (
    <Box>
      {item.info.title === "" ||
      item.info.description === "" ||
      item.info.team.length == 0 ||
      item.info.startDate === null ||
      item.info.endDate === null ? (
        <Typography sx={{ fontFamily: "monospace" }}>
          Please fill up the form
          {item.disabled(true)}
        </Typography>
      ) : (
        <Box>
          {item.disabled(false)}
          <Typography>Title</Typography>
          <Box sx={boxStyle}>
            <Typography sx={{ fontFamily: "monospace" }}>
              {item.info.title}
            </Typography>
          </Box>
          <Typography>Description</Typography>
          <Box sx={boxStyle}>
            <Typography sx={{ fontFamily: "monospace" }}>
              {item.info.description}
            </Typography>
          </Box>
          <Typography>Team</Typography>
          <Box sx={boxStyle}>
            <Typography sx={{ fontFamily: "monospace" }}>
              {item.info.team.map((item) => (
                <span>{item} </span>
              ))}
            </Typography>
          </Box>
          <Typography>Time Line</Typography>
          <Box sx={boxStyle}>
            <Typography sx={{ fontFamily: "monospace" }}>
              {item.info.startDate.$D}/{item.info.startDate.$M + 1}/
              {item.info.startDate.$y} - {item.info.endDate.$D}/
              {item.info.endDate.$M + 1}/{item.info.endDate.$y}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
