import { Box, Button, List, Typography } from "@mui/material";
import SpecItem from "../components/SpecItem";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import axios from "axios";

function SpecsList() {
  const [specsList, setSpecsList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/specs/tasks-info")
      .then((response) => {
        setSpecsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // let specsList = [
  //   {
  //     date: "11.11.11",
  //     title: "test",
  //     team:['a','b','c'],
  //     info: "lorexdfd dvbdgb fhn db xbgf n bn b gb gfb sn s bd b  nfjn fsj bd bj bjf b gbjs bjjb js bs jb sbdhn dhdhg ddhn nn dgndhg ndh ndh md hmd ghnd hg dh ndg nd",
  //   },
  //   {
  //     date: "11.11.11",
  //     title: "test",
  //     team:['a','b','c'],
  //     info: "check",
  //   },
  // ];
  // specsList = []

  return (
    <Box sx={{ height: "100vh", bgcolor: "background.b1" }}>
      <Box sx={{ bgcolor: "background.b1", padding: 3 }}>
        <Link to={"../SpecInput"}>
          <Button variant="contained" sx={{ bgcolor: "background.y" }}>
            <Typography fontSize={11} fontWeight={700}>
              Add New Spec
            </Typography>
            <Box
              sx={{
                bgcolor: "background.b2",
                display: "flex",
                height: "30px",
                width: "50px",
                marginLeft: 2,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
              }}
            >
              <AddIcon color="primary" />
            </Box>
          </Button>
        </Link>
      </Box>

      <List sx={{ padding: 0, textAlign: "center" }}>
        {specsList.length > 0 ? (
          specsList.map((spec, index) => (
            <SpecItem
              date={spec.creationDate}
              title={spec.title}
              info={spec.description}
              key={spec.id}
              id={spec.id}
              avater={spec.creator}
            />
          ))
        ) : (
          <Typography
            sx={{
              bgcolor: "background.b2",
              color: "background.y",
              paddingY: 2,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            No Specs currently available
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default SpecsList;
