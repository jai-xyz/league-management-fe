import React from "react";
import ShowDivision from "./showDivision";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Division = () => {
  return (
    <div>
      <Button variant="contained">
        <Link to="/admin/division/add">Add Division</Link>
      </Button>

      <ShowDivision />
    </div>
  );
};

export default Division;
