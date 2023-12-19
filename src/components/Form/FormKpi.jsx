import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputDateRangeField } from "@mui/x-date-pickers-pro/MultiInputDateRangeField";
import "dayjs/locale/en-gb";
import Typography from "@mui/material/Typography";

const inputStyle = {
  bgcolor: "secondary.light",
  margin: 1,
  borderRadius: 2,

  "& label": {
    color: "info.main",
  },
};

export default function FormKpi(props) {
  const [date1, setDate1] = React.useState(props.info.startDate || dayjs());
  const [date2, setDate2] = React.useState(props.info.endDate);

  React.useEffect(() => {

    if (props.info.endDate) {

      if (props.info.startDate.$d == 'Invalid Date' || props.info.endDate.$d == 'Invalid Date') {
        if (props.info.startDate > props.info.endDate);
        props.fillPage(true);
      } else {
        props.fillPage(false);
      }
    }
  }, [props.info.startDate, props.info.endDate]);

  const handleTime = (newDate) => {
    props.set({ ...props.info, startDate: newDate[0], endDate: newDate[1] });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Typography sx={{ fontSize: 24, fontWeight: 700, marginLeft: 1 }}>
        Time Line
      </Typography>
      <MultiInputDateRangeField
        onChange={handleTime}
        sx={inputStyle}
        defaultValue={[date1, date2]}
      />
    </LocalizationProvider>
  );
}
