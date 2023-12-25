import { Box, Button, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputDateRangeField } from "@mui/x-date-pickers-pro";
import { EditButton } from "../global/btns";

export default function SpecKpi(props) {
  const [edit, setEdit] = useState(false);
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const startObject = dayjs(props.info.startDate);
    const endObject = dayjs(props.info.endDate);
    setDates({
      startDate:
        startObject.$D + "." + (startObject.$M + 1) + "." + startObject.$y,
      endDate: endObject.$D + "." + (endObject.$M + 1) + "." + endObject.$y,
    });
  }, [props.info.startDate, props.info.endDate]);

  const handleTime = (newDate) => {
    props.set({ ...props.info, startDate: newDate[0], endDate: newDate[1] });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Time-line:</Typography>
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
        
          <EditButton func={() => setEdit(true)} authorId = {props.info.author._id}/>

        )}
      </Box>
      <Box
        sx={{
          bgcolor: "secondary.light",
          borderRadius: 1,
          padding: 1,
          marginTop: 1,
        }}
      >
        {edit ? (
          <Box>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <MultiInputDateRangeField
                onChange={handleTime}
                defaultValue={[dayjs(props.info.startDate), dayjs(props.info.endDate)]}
              />
            </LocalizationProvider>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box
              sx={{
                width: "50%",
                marginX: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                Starting Date
              </Typography>
              <Box
                sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: 18 }}
              >
                {dates.startDate}
              </Box>
            </Box>
            <Box
              sx={{
                fontWeight: 700,
                fontSize: 24,
                display: "flex",
                alignItems: "center",
              }}
            >
              -
            </Box>
            <Box
              sx={{
                width: "50%",
                marginX: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                Ending Date
              </Typography>
              <Box
                sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: 18 }}
              >
                {dates.endDate}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
