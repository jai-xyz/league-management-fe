// import React from 'react'
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { getDivision } from '../../../api/divisionApi';
// import { useQuery } from '@tanstack/react-query';


// const Dropdown = () => {

//     const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['division'],
//     queryFn: getDivision,
//     refetchOnWindowFocus: false,
//   })
//     if (isLoading) {
//         return <div>Loading...</div>
//     }
//     if (isError) {
//         return <div>Error fetching division</div>
//     }




//   return (
//    <div>
//       <Button
//         id="fade-button"
//         aria-controls={open ? 'fade-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         Select Division
//       </Button>
//       <Menu
//         id="fade-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
      
//       >
//         {data.map((division) => (
//         <MenuItem key={division.division_id} onClick={handleClose}>
//           {division.name}
//         </MenuItem>
//         ))}
        
//       </Menu>
//     </div>
//   )
// }

// export default Dropdown
