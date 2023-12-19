import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Backdrop, CircularProgress } from "@mui/material";

import EditableField from "../components/SingleSpec/EditableField";
import SpecTitle from "../components/SingleSpec/SpecTitle";
import SpecDescription from "../components/SingleSpec/SpecDescription";
import SpecTask from "../components/SingleSpec/SpecTask";
import SpecTeam from "../components/SingleSpec/SpecTeam";
import SpecComments from "../components/SingleSpec/SpecComments";
import SpecContent from "../components/SingleSpec/SpecContent";

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

const SingleSpec = () => {
  const { id } = useParams();
  const [specData, setSpecData] = useState(null);
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/specs/${id}`)

      .then((response) => {
        const data = response.data;
        setSpecData(data);
      })
      .catch((error) => {
        console.error("Error when retrieving spec data :", error);
      });
  }, [id]);
  useEffect(() => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/specs/${id}`, specData)
      .catch((error) => {
        console.error("Error updating spec data :", error);
      });
  }, [specData]);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingTasks, setIsEditingTasks] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);

  const updateSpecData = (field, newValue) => {
    setSpecData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };

  const handleSave = async (field, newValue) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/specs/${id}`, {
        [field]: newValue,
      });
      updateSpecData(field, newValue);
      setIsEditing(false);
    } catch (error) {
      console.error(`Error saving ${field}:`, error);
    }
  };

  const handleSaveDescription = async (newDescription) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/specs/${id}`, {
        description: newDescription,
      });
      updateSpecData("description", newDescription);
      setIsEditingDescription(false);
    } catch (error) {
      console.error("Error saving description:", error);
    }
  };

  // const handleSaveTeam = async (newTeam) => {
  //   try {
  //     await axios.put(`${import.meta.env.VITE_API_URL}/specs)/${id}`, {
  //       team: newTeam,
  //     });
  //     updateSpecData("team", newTeam);
  //     setIsEditingDescription(false);
  //   } catch (error) {
  //     console.error("Error saving team:", error);
  //   }
  // };

  const handleEditClick = (field) => {
    switch (field) {
      case "title":
        setIsEditingTitle(true);
        break;
      case "description":
        setIsEditingDescription(true);
        break;
      case "content":
        setIsEditingTasks(true);
        break;
      case "team":
        setIsEditingTeam(true);
        break;
      case "tasks":
        setIsEditingTasks(true);
        break;
      default:
        break;
    }
  };

  if (!specData) {
    return (
      <Backdrop
        sx={{
          bgcolor: "background.b1",
          color: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box sx={pageStyle}>
      <NavLink to="../">
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

      <Box
        sx={{
          ...componentStyle,
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isEditingTitle ? (
          <EditableField content={specData.title} onSave={handleSaveTitle} />
        ) : (
          <>
            <SpecTitle title={specData.title} />
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick("title")}
            ></Button>
          </>
        )}
      </Box>

      <Box
        sx={{
          ...componentStyle,
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isEditingDescription ? (
          <EditableField
            content={specData.description}
            onSave={handleSaveDescription}
          />
        ) : (
          <>
            <SpecDescription description={specData.description} />
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick("description")}
            ></Button>
          </>
        )}
      </Box>
      
      {/* <Box sx={componentStyle}>
          <SpecContent set={setSpecData} info={specData}/>
      </Box>

      <Box
        sx={{
          ...componentStyle,
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        {specData.task.tasks.length > 0 && (
          <SpecTask info={specData} set={setSpecData} />
        )}
      </Box> */}

      <Box sx={componentStyle}>
        <SpecTeam info={specData} set={setSpecData}/>
      </Box>

      <Box
        sx={{
          ...componentStyle,
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SpecComments
          specId={id}
          onCommentAdded={() => {
            console.log("Comment added!");
          }}
          onReplyAdded={() => {
            console.log("Reply added!");
          }}
        />
      </Box>
    </Box>
  );
}

export default SingleSpec;
