import React from 'react';
import { Box, List, ListItem, Typography } from "@mui/material";


function SpecTeam({ team }) {
  return (
    <div>
      <Typography variant="h5">Team:</Typography>
      <ul>
        {team.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpecTeam;

