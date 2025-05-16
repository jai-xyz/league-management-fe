import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ShowTeams from './ShowTeams'
import { Button } from '@mui/material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getDivision } from '../../../api/divisionApi';
import { useQuery } from '@tanstack/react-query';

const Teams = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [divisionName, setDivisionName] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDivisionSelect = (division_id , divisionName) => {
      setSelectedDivision(division_id);
      setDivisionName(divisionName);

      handleClose();
    }
  
    const { data, isLoading, isError } = useQuery({
      queryKey: ['division'],
      queryFn: getDivision,
      refetchOnWindowFocus: false,
    })   
      if (isLoading) {
          return <div>Loading...</div>
      }
      if (isError) {
          return <div>Error fetching division</div>
      }
  return (
    <div>
      <div className='mb-4'>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Select Division
            </Button>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            
            >
              {data.map((division) => (
              <MenuItem key={division.division_id}
              onClick={() => handleDivisionSelect(division.division_id, division.name)}
             >
                {division.name}
              </MenuItem>
              ))}
              
            </Menu>
          </div>
      
          {selectedDivision && (
       
                      <Button variant="contained">
                          <Link to={`/admin/teams/add/${selectedDivision}`} style={{ color: 'white', textDecoration: 'none' }}>
                              Add Teams for {divisionName}
                          </Link>
                      </Button>
                  )}
          <br />
        
            
      
      <ShowTeams division_id={selectedDivision} name={divisionName}/>
     
    </div>
  )
}

export default Teams
