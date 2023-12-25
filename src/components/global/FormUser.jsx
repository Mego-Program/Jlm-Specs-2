import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import AlertDialog from "./AlertDialog";
import UserProfile from "./UserProfile";

export default function Item(props) {
  const [user, setUser] = React.useState(false);


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await UserProfile;
        if (props.authorId && userData._id === props.authorId){
          setUser(true)
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ListItem
      sx={{ display: "flex", alignItems: "center", borderBottom: 1 }}
      alignItems="flex-start"
    >
      <Avatar
        alt={props.user.userName}
        src={props.user.img}
        sx={{
          bgcolor: "primary.main",
          border: 2,
          marginRight: 2,
          width: 56,
          height: 56,
        }}
      />
      <ListItemText primary={props.user.userName} />
      {props.del && user && (
        <AlertDialog
          type={"user"}
          del={props.del}
          index={props.id}
          iconSx={{ paddingTop: 0 }}
          btnSx={{
            color: "primary.main",
            border: 2,
            padding: 0.5,
            width: 50,
            height: 35,
            borderRadius: 1,
            borderColor: "secondary.light",
            "&:hover": {
              bgcolor: "secondary.light",
              borderColor: "primary.main",
            },
          }}
          disableIcon={{
            cursor: "not-allowed",
            "&:hover": { bgcolor: "secondary.light" },
          }}
          disableBtn={{
            color: "secondary.main",
          }}
        />
      )}
    </ListItem>
  );
}
