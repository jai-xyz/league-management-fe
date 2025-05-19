import {React , useEffect, useState} from 'react';
import ApiService from '../../../services/api-service';
import { useParams } from 'react-router-dom';


const EditTeams = () => {

  const{id} = useParams();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: '',
    alias: '',
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
        setImage(`http://127.0.0.1:8000/storage/${team.logo}`); // Set the image URL for preview
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };
  
    fetchTeam(); 
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(URL.createObjectURL(file));    
        setImageFile(file)
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('alias', form.alias);


    if (imageFile) {
        formData.append('logo', imageFile); 
      } else {
        formData.append('logo', image); 
        }

    try {
      const response = await ApiService.post(`teams/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        if (response.status === 200) {
            console.log('Team updated successfully:', response.data);
        }
    } catch (error) {
      console.error('Error updating team:', error); 
    }
    setForm({
      name: '',
      alias: '',
    });
    setImage(null);
    setImageFile(null); 

  }

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Update a team</h2>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Team Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type product name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Team Alias
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type product name"
                required
                value={form.alias}
                onChange={(e) => setForm({ ...form, alias: e.target.value })}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="logo"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Team Logo
              </label>
              <input
                type="file"
                name="logo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Logo"
                required
                value={form.logo}
                onChange={handleImageChange}
                accept="image/*"

              />
            </div>
            {image && (
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Preview:
                </label>
                <img src={image} alt="Event Preview" className="w-full h-auto rounded-md shadow-inner" />
              </div>
            )}
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
          >
            Update Teams
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditTeams;