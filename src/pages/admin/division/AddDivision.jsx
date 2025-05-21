import React, { useState } from "react";
import ApiService from "../../../services/api-service";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Swal from "sweetalert2";

const AddDivision = () => {
  const [form, setForm] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.post("/divisions", {
        name: form.name,
      });
      if (response.status === 200) {
        // Show success alert
        await Swal.fire({
          title: "Division Added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/admin/division");
        
      }

    } catch (error) {
       if(error.response?.status === 422) {
        setError(error.response.data.error);
      }
    }
   
  };

  return (
    <div>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <TextField
            id="standard-basic"
            error = {error?.name ? true : false}
            helperText={error?.name}
            label="Division Name"
            variant="standard"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Button type="submit" variant="contained">
            Add Division
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDivision;
