import React from 'react'
import ApiService from '../../../services/api-service';
const DeleteTeams = ({id } ) => {

    const handleDelete = async () => {
        try {
            const response = await ApiService.delete(`teams/${id}`);
            console.log('Team deleted successfully:', response.data);
            alert('Team deleted successfully');
           
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
