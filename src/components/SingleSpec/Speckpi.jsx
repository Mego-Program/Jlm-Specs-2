import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function SpecKpi(props) {

    // const [startDate, setStartDate] = useState(dayjs(startDate))
    // const [endDate, setendDate] = useState(dayjs(endDate))

    // console.log(startDate);

    return (
        <Box>
            <Typography variant="h5">Time-line:</Typography>
            <Box>test</Box>
            {console.log(dayjs(props.info.endDate))}
        </Box>
    )
}