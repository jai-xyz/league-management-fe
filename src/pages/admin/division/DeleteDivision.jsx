import React from "react";
import ApiService from "../../../services/api-service";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
const DeleteDivision = ({ id }) => {
  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await ApiService.delete(`divisions/${id}`);
          if (response.status === 200) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        }
      });
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };
  return (
    <div>
      <button
        onClick={handleDelete}
        type="button"
        className=" font-bold group cursor-pointer"
      >
        <DeleteIcon className="#818a8c  group-hover:text-red-500" />
      </button>
    </div>
  );
};

export default DeleteDivision;
