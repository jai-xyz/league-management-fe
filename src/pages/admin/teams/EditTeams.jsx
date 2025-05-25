import { React, useEffect, useState } from "react";
import ApiService from "../../../services/api-service";
import { useParams } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditTeams = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    alias: "",
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await ApiService.get(`teams/${id}`);
        const team = response.data;
        setForm({
          name: team.name,
          alias: team.alias,
        });
        setImage(`http://127.0.0.1:8000/storage/logo_images/${team.logo}`); // Set the image URL for preview
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchTeam();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("alias", form.alias);

    if (imageFile) {
      formData.append("logo", imageFile);
    } else {
      formData.append("logo", image);
    }

    try {
      const response = await ApiService.post(`teams/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        await Swal.fire({
          title: "Team Updated successfully!",
          text: "Success!",
          icon: "success",
          confirmButtonText: "Okay",
        });

        Navigate("/admin/teams");

        // Reload the page after the alert is closed
        window.location.reload();
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setError(error.response.data.error);
      }
    }
  };

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
        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <TextField
            fullWidth
            error={error?.name ? true : false}
            helperText={error?.name ? error.name[0] : ""}
            label="Team Name"
            id="fullWidth"
            sx={{ marginTop: 2 }}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            fullWidth
            error={error?.alias ? true : false}
            helperText={error?.alias ? error.alias[0] : ""}
            label="Team Alias"
            id="fullWidth"
            sx={{ marginTop: 2 }}
            value={form.alias}
            onChange={(e) => setForm({ ...form, alias: e.target.value })}
          />
          <TextField
            error={error?.logo ? true : false}
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
                src={image ? image : "Failed to load image"}
                alt="Image Preview"
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

export default EditTeams;
