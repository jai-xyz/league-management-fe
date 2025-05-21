import { React, useState } from "react";
import ApiService from "../../../services/api-service";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDivisionID } from "../../../api/getDivisionID";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const AddTeams = () => {
  const Navigate = useNavigate();
  const { divisionId } = useParams();
  const [error, setError] = useState(null);


  const { data, isLoading, isError } = useQuery({
    queryKey: ["getDivisionID", divisionId],
    queryFn: () => getDivisionID(divisionId),
    enabled: !!divisionId, // Only fetch if id is truthy
    refetchOnWindowFocus: false,
  });

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    alias: "",
    division_id: divisionId,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a preview URL
      setImageFile(file); // Store the actual file for submission
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("alias", form.alias);
    formData.append("division_id", form.division_id); // Append the division ID
    formData.append("logo", imageFile); // Append the file to the FormData

    try {
      const response = await ApiService.post("/teams", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
     if (response) {
                // Show success alert
                await Swal.fire({
                  title: 'Team Added successfully!',
                  text: 'Success!',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                });

                Navigate('/admin/teams')

                // Reload the page after the alert is closed
                window.location.reload();
              }

            setForm({
              name: "",
              alias: "",
                });
              setImage(null);
              setImageFile(null);
                
  
    } catch (error) {
      if(error.response?.status === 422) {
        setError(error.response.data.error);
       
      }
      else {
        setError("An error occurred while adding the team.");
      }
    }
   
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching teams</div>;
  }

  return (
    <section className="bg-white">
     
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
         <Typography
        variant="h4"
        component="h1"
        className=" text-gray-800 font-bold py-4"
      >
        Add Team
      </Typography>
          <Box sx={{ width: 500, maxWidth: '100%' }}>
        <TextField
        fullWidth
        label={data?.name}
        id="fullWidth"
        disabled
        sx={{ marginTop: 2 }}
        value={data?.name}
        />
        
      <TextField
        fullWidth
        error = {error?.name ? true : false}
        helperText={error?.name ? error.name[0] : ""}
        label="Team Name"
        id="fullWidth"
        sx={{ marginTop: 2 }}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <TextField
        fullWidth
        error = {error?.alias ? true : false}
        helperText={error?.alias ? error.alias[0] : ""}
        label="Team Alias"
        id="fullWidth"
        sx={{ marginTop: 2 }}
        value={form.alias}
        onChange={(e) => setForm({ ...form, alias: e.target.value })}
      />
       <TextField
        error = {error?.logo ? true : false}
        fullWidth
        id="fullWidth"
        sx={{ marginTop: 2 }}
        onChange={handleImageChange}
        accept="image/*"
        type="file"
        helperText="Upload your team logo"
      />
         {image && (
              <div className="mt-4">
                <Typography variant="subtitle1" gutterBottom>
                  Preview:
                </Typography>
                <img
                  src={image}
                  alt="Event Preview"
                  className="w-full h-auto rounded-md shadow-inner"
                />
              </div>
            )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Add Team
      </Button>

      </Box>
         
      </div>
     
    </section>
  );
};

export default AddTeams;
