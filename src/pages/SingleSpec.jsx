import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditableField from "../components/EditableField";
import SpecTitle from "../components/SpecComponents/SpecTitle";
import SpecDescription from "../components/SpecComponents/SpecDescription";
import SpecContent from "../components/SpecComponents/SpecContent";
import SpecOwner from "../components/SpecComponents/SpecOwner";
import SpecUsers from "../components/SpecComponents/SpecUsers";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const pageStyle = {
  backgroundColor: "background.b1",
  paddingX: 15,
  paddingBottom: 5,
  paddingTop: 0,
  color: "white",
  minHeight: "100vh",
  boxSizing: "border-box",
};

const componentStyle = {
  backgroundColor: "background.b2",
  padding: "16px",
  marginBottom: "16px",
  borderRadius: 2,
};

function SingleSpec() {
  const { id } = useParams();
  const [specData, setSpecData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/specs/spec/${id}`)
      .then((response) => {
        const data = response.data[0];
        console.log("Spec data :", data);
        setSpecData(data);
      })
      .catch((error) => {
        console.error("Error when retrieving spec data :", error);
      });
  }, [id]);
  

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingOwner, setIsEditingOwner] = useState(false);
  const [isEditingUsers, setIsEditingUsers] = useState(false);

  const updateSpecData = (field, newValue) => {
    setSpecData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };
  

  const handleSaveTitle = (newTitle) => {
    console.log("New title content :", newTitle);
    updateSpecData("title", newTitle);
    setIsEditingTitle(false);
  };
    

  const handleSaveDescription = (newDescription) => {
    console.log("New description content :", newDescription);
    updateSpecData("description", newDescription);
    setIsEditingDescription(false);
  };

  const handleSaveContent = (newContent) => {
    console.log("New content :", newContent);
    updateSpecData("content", newContent);
    setIsEditingContent(false);
  };

  const handleSaveOwner = (newOwner) => {
    console.log("New owner :", newOwner);
    updateSpecData("owner", newOwner);
    setIsEditingOwner(false);
  };

  const handleSaveUsers = (newUsers) => {
    console.log("New users :", newUsers);
    updateSpecData("users", newUsers);
    setIsEditingUsers(false);
  };

  const handleEditClick = (field) => {
    switch (field) {
      case "title":
        setIsEditingTitle(true);
        break;
      case "description":
        setIsEditingDescription(true);
        break;
      case "content":
        setIsEditingContent(true);
        break;
      case "owner":
        setIsEditingOwner(true);
        break;
      case "users":
        setIsEditingUsers(true);
        break;
      default:
        break;
    }
  };

  if (!specData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={pageStyle}>
      {/* <NavLink to="../SpecsList"> */}
      <NavLink to="../SpecsList">
        <KeyboardBackspaceOutlinedIcon
          color="primary"
          sx={{
            margin: 0,
            fontSize: "3rem",
            fontWeight: 700,
            "&:hover": { color: "primary.dark" },
            "&:active": { color: "primary.light" },
          }}
        />
      </NavLink>

      <Box sx={componentStyle}>
        {isEditingTitle ? (
          <EditableField content={specData.title} onSave={handleSaveTitle} />
        ) : (
          <>
            <SpecTitle title={specData.title} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick("title")}
            >
              Edit
            </Button>
          </>
        )}
      </Box>

      <Box sx={componentStyle}>
        {isEditingDescription ? (
          <EditableField
            content={specData.description}
            onSave={handleSaveDescription}
          />
        ) : (
          <>
            <SpecDescription description={specData.description} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick("description")}
            >
              Edit
            </Button>
          </>
        )}
      </Box>

      <Box sx={componentStyle}>
        {isEditingContent ? (
          <EditableField
            content={specData.content}
            onSave={handleSaveContent}
          />
        ) : (
          <>
            <SpecContent content={specData.content} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick("content")}
            >
              Edit
            </Button>
          </>
        )}
      </Box>

      <Box sx={componentStyle}>
        {isEditingOwner ? (
          <EditableField content={specData.owner} onSave={handleSaveOwner} />
        ) : (
          <>
            <SpecOwner owner={specData.owner} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick("owner")}
            >
              Edit
            </Button>
          </>
        )}
      </Box>

      <Box sx={componentStyle}>
        {isEditingUsers ? (
          <EditableField
            content={specData.users.join(", ")}
            onSave={handleSaveUsers}
          />
        ) : (specData.users &&
          <>
            <SpecUsers users={specData.users} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick("users")}
            >
              Edit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default SingleSpec;
