import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SpecTitle from "../components/SpecComponents/SpecTitle";
import SpecDescription from "../components/SpecComponents/SpecDescription";
import SpecContent from "../components/SpecComponents/SpecContent";
import SpecOwner from "../components/SpecComponents/SpecOwner";
import SpecUsers from "../components/SpecComponents/SpecUsers";
import EditableField from "../components/EditableField";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

const pageStyle = {
  backgroundColor: "background.b1",
  paddingX:15,
  paddingBottom:5,
  paddingTop:0,
  color: "white",
  minHeight:'100vh',
  boxSizing:'border-box'
};

const componentStyle = {
  backgroundColor: "background.b2",
  padding: "16px",
  marginBottom: "16px",
  borderRadius:2
};

function SingleSpec() {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("Project Refael A");




  const handleSaveTitle = (newTitle) => {
    setTitle(newTitle);
    setIsEditingTitle(false);
  };

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(
    "This specification is related to the development of Project A, including its features and requirements."
  );
  const handleSaveDescription = (newDescription) => {
    setDescription(newDescription);
    setIsEditingDescription(false);
  };

  const [isEditingContent, setIsEditingContent] = useState(false);
  const [content, setContent] = useState(
    "Objective: Achieve a 20% increase in user conversion."
  );
  const handleSaveContent = (newContent) => {
    setContent(newContent);
    setIsEditingContent(false);
  };

  const [isEditingOwner, setIsEditingOwner] = useState(false);
  const [owner, setOwner] = useState("CEO");
  const handleSaveOwner = (newOwner) => {
    setOwner(newOwner);
    setIsEditingOwner(false);
  };

  const [isEditingUsers, setIsEditingUsers] = useState(false);
  const [users, setUsers] = useState([
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Alice Johnson" },
  ]);
  const handleSaveUsers = (newUsers) => {
    setUsers(newUsers);
    setIsEditingUsers(false);
  };

  // const title = "Project Specification A";
  // const description =
  //   "This specification is related to the development of Project A, including its features and requirements.";
  // const content = "Objective: Achieve a 20% increase in user conversion.";
  // const owner = "CEO";
  // const users = ["John Doe", "Jane Smith", "Alice Johnson"];

  return (
    <Box sx={pageStyle}>
      <NavLink to='../SpecsList'>
      <KeyboardBackspaceOutlinedIcon color="primary" sx={{ margin:0, fontSize:'3rem', fontWeight:700, '&:hover':{color:'primary.dark'}, '&:active':{color:'primary.light'}}}/>
      </NavLink>
      <Box sx={componentStyle}>
        {isEditingTitle ? (
          <EditableField
            content={title}
            onSave={(newTitle) => {
              setTitle(newTitle);
              setIsEditingTitle(false);
            }}
          />
        ) : (
          <>
            <SpecTitle title={title} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setIsEditingTitle(true)}
            >
              Edit
            </Button>
          </>
        )}
      </Box>

      <Box sx={componentStyle}>
        {isEditingDescription ? (
          <EditableField
            content={description}
            onSave={(newDescription) => {
              setDescription(newDescription);
              setIsEditingDescription(false);
            }}
          />
        ) : (
          <>
            <SpecDescription description={description} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setIsEditingDescription(true)}
            >
              Edit
            </Button>
          </>
        )}
      </Box>

      <Box sx={componentStyle}>
        {isEditingContent ? (
          <EditableField
            content={content}
            onSave={(newContent) => {
              setContent(newContent);
              setIsEditingContent(false);
            }}
          />
        ) : (
          <>
            <SpecContent content={content} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setIsEditingContent(true)}
            >
              Edit
            </Button>
          </>
        )}
      </Box>

      <Box sx={componentStyle}>
        {isEditingOwner ? (
          <EditableField
            content={owner} // Passer 'owner' comme contenu
            onSave={(newOwner) => {
              setOwner(newOwner);
              setIsEditingOwner(false);
            }}
          />
        ) : (
          <>







            <SpecOwner owner={owner} /> {/*Passer 'owner' à SpecOwner*/}
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setIsEditingOwner(true)}
            >
              Edit
            </Button>
          </>
        )}
      </Box>

      <Box sx={componentStyle}>
        {isEditingUsers ? (
          <EditableField
            content={users.map((user) => user.name).join(", ")}
            onSave={(newContent) => {
              const newUsers = newContent
                .split(",")
                .map((user) => ({ name: user.trim() }));
              setUsers(newUsers);
              setIsEditingUsers(false);
            }}
          />
        ) : (
          <>
            <SpecUsers users={users.map((user) => user.name)} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setIsEditingUsers(true)}
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
