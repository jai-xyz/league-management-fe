import React from 'react'
import { TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {getDivision} from '../../../api/divisionApi'
import DeleteDivision from './DeleteDivision'
const ShowDivision = () => {

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
        <h2 className="mb-4 text-xl font-bold text-gray-900">Teams</h2>
         <Button variant="contained">
        <Link to="/admin/division/add">Add Division</Link>  
        </Button>
        <table className="min-w-full border-collapse border border-gray-200">
            <thead>
                <tr>
                    <th className="border border-gray-200 px-4 py-2">ID</th>
                    <th className="border border-gray-200 px-4 py-2">Name</th>
                    <th className="border border-gray-200 px-4 py-2">Actions</th>
                    <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((division) => (
                    <tr key={division.division_id}>
                        <td className="border border-gray-200 px-4 py-2">{division.division_id}</td>
                        <td className="border border-gray-200 px-4 py-2">{division.name}</td>
                        <td className="border border-gray-200 px-4 py-2">
                            <Link 
                                to={`/admin/division/edit/${division.division_id}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Edit
                            </Link>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                           <DeleteDivision id={division.division_id}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      
    </div>

   


  )
}

export default ShowDivision
