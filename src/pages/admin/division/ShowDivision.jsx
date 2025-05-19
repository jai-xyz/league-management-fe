import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {getDivision} from '../../../api/divisionApi'
import DeleteDivision from './DeleteDivision'
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { useMemo } from 'react';


// const key = 'Base';

const ShowDivision = () => {

     const materialTheme = getTheme(DEFAULT_OPTIONS);
    const theme = useTheme(materialTheme);

 const { data, isLoading, isError } = useQuery({
        queryKey: ['division'],
        queryFn: getDivision,
        refetchOnWindowFocus: false,
    });

    const nodes = useMemo(
    () =>
      Array.isArray(data)
        ? data.map((division) => ({
            id: division.division_id,
            name: division.name,
            created_at: division.created_at,
          }))
        : [],
    [data]
  );

  
  const COLUMNS = useMemo(
    () => [
      { label: 'Name', renderCell: (item) => item.name },
      {
        label: 'Created At',
        renderCell: (item) =>
          new Date(item.created_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
      },
      {
        label: 'Edit',
        renderCell: (item) => (
          <Link to={`/admin/division/edit/${item.id}`}>Edit</Link>
        ),
      },
      {
        label: 'Delete',
        renderCell: (item) => <DeleteDivision id={item.id} />,
      },
    ],
    []
  );

   if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching division</div>;

     
    
    


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
