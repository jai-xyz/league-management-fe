import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ShowTeams from "./ShowTeams";
import { Button, Menu, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getDivision } from "../../../api/divisionApi";

const Teams = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [divisionName, setDivisionName] = useState(null);

  const {
    data: divisions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["division"],
    queryFn: getDivision,
    refetchOnWindowFocus: false,
  });

  const open = Boolean(anchorEl);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleDivisionSelect = useCallback(
    (division_id, divisionName) => {
      setSelectedDivision(division_id);
      setDivisionName(divisionName);
      handleClose();
    },
    [handleClose]
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching division</div>;

  return (
    <div className="">
      <div className="mb-4">
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {divisionName ? `Division: ${divisionName}` : "Select Division"}
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {divisions.map((division) => (
            <MenuItem
              key={division.division_id}
              onClick={() =>
                handleDivisionSelect(division.division_id, division.name)
              }
            >
              {division.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {selectedDivision && (
        <Button variant="contained" sx={{ mb: 2 }}>
          <Link
            to={`/admin/teams/add/${selectedDivision}`}
            style={{ color: "white", textDecoration: "none" }}
          >
            Add Teams for {divisionName}
          </Link>
        </Button>
      )}
      <ShowTeams division_id={selectedDivision} name={divisionName} />
    </div>
  );
};

export default Teams;
