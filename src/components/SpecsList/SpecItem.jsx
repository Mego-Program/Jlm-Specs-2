import {
  Box,
  Button,
  Typography,
  ListItem,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import AlertDialog from "../global/AlertDialog";
import { useEffect, useState } from "react";
import UserProfile from "../global/UserProfile";
import DeleteIcon from "@mui/icons-material/Delete";


function SpecItem(props) {
  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await UserProfile;
        if (userData._id === props.authorId) {
          setUser(true);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchData();
  }, []);

  const delSpec = () => {
    try {
      axios.delete(`${import.meta.env.VITE_API_URL}/specs/${props.id}`);
      props.del(props.id);
    } catch (error) {
      console.log("faild to delete item: ", error);
    }
  };

  const dateobject = dayjs(props.date);
  const dateString =
    dateobject.$D + "." + (dateobject.$M + 1) + "." + dateobject.$y;

  return (
    <ListItem
      sx={{
        bgcolor: "background.b1",
        color: "text.primary",
        display: "flex",
        alignItems: "flex-start",
        padding: "0",
        paddingTop: 1,
        height: 100,
      }}
    >
      <Box sx={{ textAlign: "center", marginX: 1, width: "5vw" }}>
        <Typography sx={{ fontSize: 11 }}>{dateString}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "2px",
          width: "2vw",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.b2",
            width: "15px",
            height: "15px",
            borderRadius: "50%",
          }}
        />
        <Box sx={{ bgcolor: "background.b2", width: "2px", height: "70px" }} />
      </Box>
      <Button
        onClick={() => {
          navigate("single/" + props.id);
        }}
        sx={{
          color: "text.primary",
          bgcolor: "background.b2",
          border: 1,
          borderColor: "background.y",
          borderRadius: 1,
          width: "80%",
          display: "flex",
          height: "80%",
          margin: "5px 10px",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "70%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "start",
            wordWrap: "break-word",
            overflowX: "hidden",
            overflowY: "scroll",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Typography sx={{ fontSize: 20, margin: 0, fontWeight: 700 }}>
            {props.title}
          </Typography>
          <Typography sx={{ fontSize: 9, textAlign: "start", marginRight: 1 }}>
            {props.info}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Box>
        <AvatarGroup
          max={4}
          spacing={20}
          sx={{
            "& .MuiAvatar-root": {
              bgcolor: "secondary.light",
              width: 48,
              height: 48,
            },
            "& .css-sxh3gq-MuiAvatar-root-MuiAvatarGroup-avatar": {
              color: "primary.main",
              borderColor: "primary.main",
            },
          }}
        >
          {props.team.map((user, index) => (
            <Avatar
              key={index}
              alt={user.userName}
              src={user.img}
              sx={{ bgcolor: "primary.main" }}
            />
          ))}
        </AvatarGroup>
      </Button>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {user ? (
          <AlertDialog
            open={alert}
            setOpen={setAlert}
            del={delSpec}
            index={props.id}
            btnSx={{
              color: "primary.main",
              boxSizing: "border-box",
              "&:hover": { border: 1, borderColor: "primary.main" },
              padding: 1,
              borderRadius: "50%",
              fontSize: 48,
            }}
          />
        ) : (
          <Box marginLeft={1}>
            <DeleteIcon sx={{
              color: "secondary.light",
              boxSizing: "border-box",
              "&:hover": { border: 1, borderColor: "secondary.light" },
              padding: 1,
              borderRadius: "50%",
              fontSize: 48,
              cursor:'not-allowed'
            }}/>
          </Box>
        )}
      </Box>
    </ListItem>
  );
}
export default SpecItem;
