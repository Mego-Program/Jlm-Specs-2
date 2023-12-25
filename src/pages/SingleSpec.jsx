import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import SpecInfo from "../components/SingleSpec/SpecInfo";
import SpecTask from "../components/SingleSpec/SpecTask";
import SpecTeam from "../components/SingleSpec/SpecTeam";
import SpecComments from "../components/SingleSpec/SpecComments";
import SpecContent from "../components/SingleSpec/SpecContent";
import SpecKpi from "../components/SingleSpec/Speckpi";

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
      .then((response) => setSpecData(response.data))
      .catch((error) =>
        console.error("Error when retrieving spec data :", error)
      );
  }, [id]);

  useEffect(() => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/specs/${id}`, specData)
      .catch((error) => console.error("Error updating spec data :", error));
  }, [id, specData]);

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
      <Box sx={{...componentStyle, marginBottom:0}}>
        <SpecInfo
          content={specData.title}
          onSave={(newTitle) => handleSave("title", newTitle)}
          type="title"
          authorId={specData.author._id}
        />
      </Box>

      <Box sx={componentStyle}>
        <SpecInfo
          content={specData.description}
          onSave={(newDescription) => handleSave("description", newDescription)}
          type="description"
          authorId={specData.author._id}

        />
      </Box>

      <Box sx={componentStyle}>
        <SpecContent set={setSpecData} info={specData} />
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
        <SpecTask info={specData} set={setSpecData} />
      </Box>

      <Box sx={componentStyle}>
        <SpecTeam info={specData} set={setSpecData} />
      </Box>
      <Box sx={componentStyle}>
        <SpecKpi info={specData} set={setSpecData} />
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
          specAuthor={specData.author}
        />
      </Box>
    </Box>
  );
};

export default SingleSpec;