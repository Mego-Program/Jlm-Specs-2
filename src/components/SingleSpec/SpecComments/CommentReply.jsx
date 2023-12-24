import { Avatar, Box, Typography } from "@mui/material";
import AlertDialog from "../../global/AlertDialog";
import { useEffect, useState } from "react";
import UserProfile from "../../global/UserProfile";

export default function CommentReply(props) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await UserProfile;
        if (userData.userName === props.author.userName || userData.userName === auther.userName) setUser(true);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchData();
  }, []);

  const del = (index) => {
    console.log(user);
    console.log(props);
    if (props.commentId) props.del(props.commentId, index);
    else props.del(index);
  };

  return (
    <Box
      sx={{
        padding: 1,
        borderBottom: 1,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt={props.author.userName}
            src={props.author.img}
            sx={{ border: 2, borderColor: "primary.main" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              marginLeft: 1,
            }}
          >
            {props.author.userName}
          </Typography>
        </Box>
        <Typography sx={{ marginTop: 1, marginLeft: 6 }}>
          {props.content}
        </Typography>
      </Box>
      {user && (
        <AlertDialog
          type={props.type}
          del={del}
          index={props.index}
          iconSx={{}}
          btnSx={{
            color: "primary.main",
            border: 2,
            padding: 0.5,
            width: 70,
            height: 45,
            borderRadius: 1,
            borderColor: "secondary.light",
            "&:hover": {
              bgcolor: "secondary.light",
              borderColor: "primary.main",
            },
          }}
        />
      )}
    </Box>
  );
}
