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
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/team`
        );
        response.data.map((item) => {
          if (item.userName === undefined || users.includes(item.userName)) {
            return;
          } else {
            setUsers((prevUsers) => {
              if (!prevUsers.includes(item.userName)) {
                return [...prevUsers, item.userName];
              }
              return prevUsers;
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [users]);

  const enterUser = (event, users) => {
    props.set({ ...props.info, team: users });
  };

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        PaperComponent={CustomPaper}
        onChange={enterUser}
        multiple
        id="tags-outlined"
        options={users}
        getOptionLabel={(option) => option}
        freeSolo
        filterSelectedOptions
        defaultValue={props.info.team}
        renderInput={(params) => (
          <TextField
            sx={{
              maxHeight: 80,
              overflow: "auto",
              "& .MuiOutlinedInput-notchedOutline": {
                border: 1,
                borderColor: "primary.main",
              },
            }}
            onChange={enterUser}
            {...params}
            placeholder="USERS"
          />
        )}
      />
      <TeamList info={props.info} set={props.set}/>
    </Stack>
  )
}