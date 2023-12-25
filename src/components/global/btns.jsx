import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";

// Reusable function to fetch the user
const fetchUser = async () => {
  try {
    const userData = await UserProfile;
    return userData;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null;
  }
};

// Function for the edit button
export const EditButton = (props) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUser();
      if (userData && userData._id === props.authorId) {
        setUser(true);
      }
    };
    fetchData();
  }, [props.authorId]);

  const handleClick = () => {
    if (user) {
      props.func(); 
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: user ? "primary.main" : "secondary.light",
        height: 30,
        paddingX: 2,
        cursor: !user && "not-allowed",
        "&:hover": user && {
          bgcolor: "secondary.light",
          border: 2,
          borderColor: "primary.main",
          translate: "1px",
        },
      }}
    >
      <EditIcon sx={{ color: user ? "primary.main" : "secondary.light" }} />
    </IconButton>
  );
};

// Function for the add button
export const AddButton = (props) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUser();
      if (userData && userData._id === props.authorId) {
        setUser(true);
      }
    };
    fetchData();
  }, [props.authorId]);

  const handleClick = () => {
    if (user) {
      props.func(); 
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        bgcolor: user ? "primary.main" : 'secondary.light',
        border: 2,
        borderColor: "secondary.main",
        borderRadius: 1,
        paddingX: 2,
        height: 35,
        cursor: !user && 'not-allowed',
        "&:hover": user && { bgcolor: "primary.light" },
      }}
    >
      <AddIcon sx={{ color: "secondary.main" }} />
    </IconButton>
  );
};
