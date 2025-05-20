import React from "react";
import ApiService from "../../../services/api-service";
import DeleteIcon from "@mui/icons-material/Delete";
const DeleteDivision = ({ id }) => {
  const handleDelete = async () => {
    try {
      const response = await ApiService.delete(`divisions/${id}`);
      console.log("Division deleted successfully:", response.data);
      alert("Division deleted successfully");
    } catch (error) {
      console.error("Error deleting division:", error);
    }
  };
  return (
    <div>
      <button onClick={handleDelete} type="button" className=" font-bold ">
        <DeleteIcon className="text-red-500" />
      </button>
    </div>
  );
};

export default DeleteDivision;
