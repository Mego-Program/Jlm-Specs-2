import styled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  Button,
  Input,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CustomPaper = (props) => {
  return (
    <Paper
      elevation={5}
      sx={{
        border:4,
        borderTop:1,
        borderColor:'secondary.main',
        bgcolor: "secondary.light",
        padding: 0,
        "& ::-webkit-scrollbar": {
          width: "6px",
        },

        " & ::-webkit-scrollbar-thumb": {
          backgroundColor: "#f6c927",
          borderRadius: "6px",
        },
      }}
      {...props}
    />
  );
};



export default function FormTask() {
 const [project, setProject] = useState('')

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ fontWeight: 700, height: 36 }}
        >
          New Task
        </Button>
        <Autocomplete
           sx={{
            width: 300,
            "& input": {
              bgcolor: "secondary.light",
              height: 10,
              borderRadius: 1,
            },
          }}
          // disablePortal
          options={top100Films}
          PaperComponent={CustomPaper}
         
          renderInput={(params) => {
            setProject(params.inputProps.value)
            return(
            <TextField
              value={'test'}
              sx={{
                height: 40,
                borderRadius: 1,
                borderColor: "secondary.light",
                "& .MuiOutlinedInput-root": {
                  height: 48,
                  border: 2,
                  borderColor: "secondary.light",
                  borderRadius: 1,
                  padding: 0,
                  paddingLeft: 1,
                },
                "& svg": { color: "secondary.light" },
              }}
              {...params}
              placeholder="Link a Project"
            />)
          }}
        />
      </Box>
      <Box sx={{ bgcolor: "secondary.light", padding: 2, borderRadius: 1 }}>
        <Stack spacing={1}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Stack>
      </Box>
    </Box>
  );
}
