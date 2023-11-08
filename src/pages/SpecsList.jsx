// import React, { useState } from 'react';
import { Box, Button, List, Typography } from "@mui/material";
import SpecItem from "../components/SpecItem";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function SpecsList() {
  let specsList = [
    {
      date: "11.11.11",
      title: "test",
      team:['a','b','c'],
      info: "lorexdfd dvbdgb fhn db xbgf n bn b gb gfb sn s bd b  nfjn fsj bd bj bjf b gbjs bjjb js bs jb sbdhn dhdhg ddhn nn dgndhg ndh ndh md hmd ghnd hg dh ndg nd",
    },
    {
      date: "11.11.11",
      title: "test",
      team:['a','b','c'],
      info: "check",
    },
  ];

  return (
    <div>
      <Box sx={{ bgcolor: "background.b1", padding: 1 }}>
        <Link to={"./SpecKpi"}>
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
              <AddIcon />
            </Box>
          </Button>
        </Link>
      </Box>

      <List sx={{ padding: 0 }}>
        {specsList.map((spec, index) => (
          <SpecItem
            date={spec.date}
            title={spec.title}
            info={spec.info}
            key={index}
          />
        ))}
      </List>
    </div>
  );
}

export default SpecsList;
