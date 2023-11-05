// import React, { useState } from 'react';
import { Button } from "@mui/material";
import SpecObject from "../components/SpecObject";
import { Link } from "react-router-dom";

function SpecsList() {
  return (
    <div>
      <h1>Specs List</h1>
      <Link to="./SpecInfo">info</Link>
      <br />
      <Link to="./SpecKpi">kpi</Link>
      {/* <BasicStack /> */}



      
      <SpecObject/>
      <SpecObject/>
    </div>
  );
}

export default SpecsList;
