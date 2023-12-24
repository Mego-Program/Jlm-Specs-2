import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Autocomplete, Box, Button, Dialog, IconButton, Paper, TextField, Typography } from "@mui/material";
import { DateField, DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { teal } from "@mui/material/colors";

export default function SpecItemTeam(props) {

    let usersList = []
    const [open, setOpen] = useState(false);
    const [disable, setDisable] = useState(true);
    const [team, setTeam] = useState([])
    const [users, setUsers] = useState([])
    const [value, setValue] = useState("")

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
              "&::-webkit-scrollbar": {
                width: "6px",
              },
    
              " &::-webkit-scrollbar-thumb": {
                backgroundColor: "#f6c927",
                borderRadius: "6px",
              },
            }}
            {...props}
          />
        );
      };

      async function fetchData() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/team`);
            response.data.forEach((user) => {
                if (!usersList.includes(user.userName)) {
                    usersList.push(user.userName);
                    console.log(usersList);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

function newItem(user) {
    console.log(user);
      const newUsers = [...props.info.team, user]
      props.set({...props.info, team: {...props.info.team, user: newUsers}})
      console.log(newUsers);
      closeDialog()
    }
  
    function closeDialog(){
      setTeam({
        team: [newUsers]
      });
      setOpen(false)
    }

const fieldStyle = {
    bgcolor: "secondary.light",
    borderRadius: 1,
    marginBottom: 1,
    "& input": { height: 35, padding: 0, paddingLeft: 1 },
  };

  return (
    <Box onClick={() => fetchData()}>
      <IconButton 
        sx={{
          bgcolor: "primary.main",
          border: 2,
          borderColor: "secondary.main",
          borderRadius: 1,
          paddingX: 2,
          height: 35,
          "&:hover": { bgcolor: "primary.light" },
        }}
        onClick={() => setOpen(true)}
      >
        <AddIcon sx={{ color: "secondary.main" }}  />
      </IconButton>
      
      <Dialog open={open} onClose={closeDialog}>
        <Box 
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            bgcolor: "secondary.dark",
            border: 1,
            borderColor: "primary.main",
            borderRadius: 1,
          }}
        >
          <Typography>Edit team:</Typography>
          <Autocomplete
          sx={{
            width: "300px",
            "& input": {
              bgcolor: "secondary.light",
              height: 10,
              borderRadius: 1,
            },
            '& svg':{color:'primary.main'}
          }}
          options={usersList}
          PaperComponent={CustomPaper}
          renderInput={(params) => {
            setValue(params.inputProps.value);
            return (
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 40,
                    border: 2,
                    borderColor: "secondary.light",
                    padding: 0,
                    paddingLeft: 1,
                  },
                  "& svg": { color: "primary.light" },
                }}
                {...params}
                placeholder="Add to team"
              />
            );
          }}
        />     
        </Box>
        <Button sx={{bgcolor: "secondary.light"}} 
        onClick={newItem(value)}
        >add</Button>
      </Dialog>
    </Box>
  );
}
