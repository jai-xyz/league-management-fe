import React from 'react'
import ApiService from '../../../services/api-service'
const DeleteDivision = ({id}) => {

    const handleDelete = async () => {
        try {
        const response = await ApiService.delete(`divisions/${id}`);
        console.log('Division deleted successfully:', response.data);
        alert('Division deleted successfully');
        } catch (error) {
        console.error('Error deleting division:', error);
        }
    }
  return (
    <div>
        <button
            onClick={handleDelete}
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
        </button>
    </div>
  )
}

export default DeleteDivision
