import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputDateRangeField } from "@mui/x-date-pickers-pro/MultiInputDateRangeField";
import "dayjs/locale/en-gb";
import { Typography } from "@mui/material";
import { useState } from "react";

const inputStyle = {
  bgcolor: "secondary.light",
  margin: 1,
  borderRadius: 2,

  "& label": {
    color: "info.main",
  },
};


export default function FormKpi(item) {
  const [date1, setDate1] = React.useState(item.info.startLine || dayjs());
  const [date2, setDate2] = React.useState(item.info.deadLine);

  


  // {date1 == null && setDate1(dayjs())}


  console.log(date1, date2);

  const handleTime = (newDate) => {
    item.set({ ...item.info, startLine: newDate[0], deadLine: newDate[1] });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Typography sx={{ fontSize: 24, fontWeight: 700, marginLeft: 1 }}>
        Time Line
      </Typography>
      <MultiInputDateRangeField
        onChange={handleTime}
        sx={inputStyle}
        defaultValue={[date1,date2]}
      />
    </LocalizationProvider>
  );
}
