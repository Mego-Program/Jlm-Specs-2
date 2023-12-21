import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Paper } from "@mui/material";
import TeamList from "./FormTeam/TeamList";
import axios from "axios";

export default function FormTeam(props) {
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

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    if(props.info.team.length == 0 ){
      props.fillPage(true)
    }else{
      props.fillPage(false)
    }
  },[props.info.team])

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/team`
        );
        setUsers(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const enterUser = (event, users) => {
    props.set({ ...props.info, team: users });
  };

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        PaperComponent={CustomPaper}
        onChange={enterUser}
        multiple
        options={users}
        getOptionLabel={(option) => option.userName} 
        freeSolo
        filterSelectedOptions
        defaultValue={props.info.team}
        renderInput={(params) => (
          <TextField
            sx={{
              maxHeight: 100,
              overflow: "auto",
              "& .MuiOutlinedInput-notchedOutline": {
                border: 1,
                borderColor: "primary.main",
              },
              '& .MuiButtonBase-root':{bgcolor:'secondary.light'}
            }}
            {...params}
            placeholder="USERS"
          />
        )}
      />
      <TeamList info={props.info} set={props.set}/>
    </Stack>
  )
}