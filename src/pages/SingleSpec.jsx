import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditableField from "../components/EditableField";
import SpecTitle from "../components/SingleSpec/SpecTitle";
import SpecDescription from "../components/SingleSpec/SpecDescription";
import SpecTasks from "../components/SingleSpec/SpecTasks";
import SpecTeam from "../components/SingleSpec/SpecTeam";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Backdrop, CircularProgress } from "@mui/material";

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
    axios
      .get(`http://localhost:4000/specs/${id}`)

      .then((response) => {
        const data = response.data;
        setSpecData(data);
      })
      .catch((error) => {
        console.error("Error when retrieving spec data :", error);
      });
  }, [id]);

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

  const handleSaveTitle = async (newTitle) => {
    try {
      await axios.put(`http://localhost:4000/specs/${id}`, { title: newTitle });
      updateSpecData("title", newTitle);

      setIsEditingTitle(false);
    } catch (error) {
      console.error("Error saving title:", error);
    }
  };

  const handleSaveDescription = async (newDescription) => {
    try {
      await axios.put(`http://localhost:4000/specs/${id}`, {
        description: newDescription,
      });
      updateSpecData("description", newDescription);
      setIsEditingDescription(false);
    } catch (error) {
      console.error("Error saving description:", error);
    }
  };

  const handleSaveTasks = async (newTasks) => {
    setIsEditingTasks(false)
    // try {
    //   await axios.put(`http://localhost:4000/specs/${id}`, { tasks: newTasks });
    //   updateSpecData("tasks", newTasks);
    //   setIsEditingDescription(false);
    // } catch (error) {
    //   console.error("Error saving tasks:", error);
    // }
  };

  const handleSaveTeam = async (newTeam) => {
    try {
      await axios.put(`http://localhost:4000/specs/${id}`, { team: newTeam });
      updateSpecData("team", newTeam);
      setIsEditingDescription(false);
    } catch (error) {
      console.error("Error saving team:", error);
    }
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

      <Box
        sx={{
          ...componentStyle,
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        {isEditingTasks ? (
          <Box>
            <Button onClick={handleSaveTasks} variant="contained">Save</Button>
          </Box>
        ) : (
          specData.task.length > 0 && (
            <>
              <SpecTasks tasks={specData.task} />
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => handleEditClick("tasks")}
              ></Button>
            </>
          )
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
        {isEditingTeam ? (
          <EditableField
            content={specData.team.join(", ")}
            onSave={handleSaveTeam}
          />
        ) : (
          specData.team && (
            <>
              <SpecTeam team={specData.team} />
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => handleEditClick("team")}
              ></Button>
            </>
          )
        )}
      </Box>
    </Box>
  );
}

export default SingleSpec;
