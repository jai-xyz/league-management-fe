import React from 'react'
import ApiService from '../../../services/api-service';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
const DeleteTeams = ({id } ) => {

    const handleDelete = async () => {
        try {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await ApiService.delete(`teams/${id}`);
                    if(response.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                }
                
            })
           
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    }


  return (
    <button
        onClick={handleDelete}
        type="button"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete
    </button>   
  )
}

export default DeleteTeams
