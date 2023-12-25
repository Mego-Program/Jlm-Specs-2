import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Autocomplete,
  Box,
  Dialog,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AddButton } from "../../global/btns";

export default function SpecItemTeam(props) {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [team, setTeam] = useState([]);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/team`
        );
        setTeam(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (user == null) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [user]);

  function newItem() {
    props.set({ ...props.info, team: [...props.info.team, user] });
    closeDialog();
  }

  function closeDialog() {
    setUser(null);
    setOpen(false);
  }

  return (
    <Box>
      <Box sx={{border:2, borderRadius:1, borderColor:'secondary.light'}}>
              <AddButton func={() => setOpen(true)} authorId={props.info.author._id} />

      </Box>

      <Dialog open={open} onClose={closeDialog}>
        <Box
          sx={{
            padding: 2,
            bgcolor: "secondary.dark",
            border: 1,
            borderBottom: 0,
            borderColor: "primary.main",
            borderTopRightRadius: 4,
            borderTopLeftRadius: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 1 }}>
            Add a member
          </Typography>
          <Autocomplete
            sx={{
              width: "300px",
              "& input": {
                bgcolor: "secondary.light",
                height: 15,
                borderRadius: 1,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: 1,
                borderColor: "primary.light",
              },
              "& svg": { color: "primary.main" },
            }}
            options={team.filter(
              (user) =>
                !props.info.team.some(
                  (teamUser) => teamUser.userName === user.userName
                )
            )}
            getOptionLabel={(option) => option.userName}
            PaperComponent={CustomPaper}
            onChange={(event, user) => {
              setUser(user);
            }}
            renderInput={(params) => {
              return (
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 50,

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
        <Box
          sx={{
            bgcolor: "secondary.dark",
            border: 1,
            borderTop: 0,
            borderColor: "primary.main",
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
            display: "flex",
            justifyContent: "space-between",
            paddingX: 1,
            paddingBottom: 2,
          }}
        >
          <IconButton onClick={closeDialog} sx={{ height: 35 }}>
            <KeyboardBackspaceIcon
              sx={{
                color: "primary.main",
                fontSize: 36,
                "&:hover": { color: "info.main" },
              }}
            />
          </IconButton>
          {disable ? (
            <IconButton
              sx={{
                bgcolor: "secondary.light",
                borderRadius: 1,
                paddingX: 2,
                height: 35,
                marginRight: 1,
                cursor: "not-allowed",
                borderColor: "secondary.light",
                "&:hover": { bgcolor: "secondary.light" },
              }}
            >
              <CheckIcon sx={{ fontSize: 30, color: "secondary.main" }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={newItem}
              disabled={disable}
              sx={{
                bgcolor: "primary.main",
                borderRadius: 1,
                paddingX: 2,
                height: 35,
                marginRight: 1,
                border: 2,
                borderColor: "secondary.light",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <CheckIcon sx={{ fontSize: 30, color: "secondary.main" }} />
            </IconButton>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
