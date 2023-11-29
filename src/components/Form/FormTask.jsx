import styled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  Button,
  Input,
  Paper,
  Popper,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FormDialog from "../FormDialog";

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
        border: 4,
        borderTop: 1,
        borderColor: "secondary.main",
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

export default function FormTask(props) {
  const [project, setProject] = useState('');
  const [projectList, setProjectList] = useState([]);
  
  useEffect(() => {
    props.set({...props.info , task : {...props.info.task, projectName: project}})
  }, [project])

  useEffect(() => {
    axios
      .get(
        "https://project-jerusalem-2-server.vercel.app/projects/listOfProjects"
      )
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <FormDialog set={props.set}/>
        <Autocomplete
          sx={{
            width: '300px',
            "& input": {
              bgcolor: "secondary.light",
              height: 10,
              borderRadius: 1,
            },
          }}
          defaultValue={props.info.task.projectName}
          options={projectList}
          PaperComponent={CustomPaper}
          renderInput={(params) => {
            setProject(params.inputProps.value);
            return (
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 40,
                    border: 2,
                    borderColor: "secondary.light",
                    padding:0,
                    paddingLeft:1
                  },
                  "& svg": { color: "secondary.light" },
                }}
                {...params}
                placeholder="Link a Project"
                
              />
            );
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
