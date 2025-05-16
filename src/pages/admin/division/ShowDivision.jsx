import React from 'react'
import { TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {getDivision} from '../../../api/divisionApi'
import DeleteDivision from './DeleteDivision'
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';


// const key = 'Base';

const ShowDivision = () => {

     const materialTheme = getTheme(DEFAULT_OPTIONS);
    const theme = useTheme(materialTheme);

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

    const nodes = Array.isArray(data) 
        ? data.map((division) => ({
            id: division.division_id,
            name: division.name,
            created_at: division.created_at,
        })) 
        : [];

       const COLUMNS = [
    // { label: 'ID', renderCell: (item) => item.id },
    { label: 'Name', renderCell: (item) => item.name },
     { 
    label: 'Created_at', 
    renderCell: (item) => 
      new Date(item.created_at).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        // hour: '2-digit',
        // minute: '2-digit',
      })
  },
    
    { label: 'Actions', renderCell: (item) => <Link to={`/admin/division/edit/${item.id}`}>Edit</Link> },
    { label: 'Actions', renderCell: (item) => <DeleteDivision id={item.id} /> },
  ];
 

    

  return (

   <>
    <CompactTable
                data={{ nodes }}
                columns={COLUMNS}
                theme={theme}
                rowKey="id"
            />

    
      
    </>


  )
}

export default ShowDivision
