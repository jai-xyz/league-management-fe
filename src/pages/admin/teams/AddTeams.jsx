import {React ,  useState} from 'react';
import ApiService from '../../../services/api-service';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDivisionID } from '../../../api/getDivisionID';

const AddTeams = () => {

  const{divisionId } = useParams();

  const { data, isLoading, isError } = useQuery({
        queryKey: ['getDivisionID', divisionId ],
        queryFn: () => getDivisionID(divisionId ),
        enabled: !!divisionId ,  // Only fetch if id is truthy
        refetchOnWindowFocus: false,
    })

  

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: '',
    alias: '',
    division_id: divisionId ,
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
    formData.append('name', form.name);
    formData.append('alias', form.alias);
    formData.append('division_id', form.division_id); // Append the division ID
    formData.append('logo', imageFile); // Append the file to the FormData

    try {
      const response = await ApiService.post('/teams', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); 
    } catch (error) {
      console.error('Error adding team:', error); 
    }
    setForm({
      name: '',
      alias: '',
    });
    setImage(null);
    setImageFile(null); 

  }

  
  
  if (isLoading) {  
      return <div>Loading...</div>
  }
  if (isError) {

      return <div>Error fetching teams</div>
  }

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Add a new team</h2>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
             <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Divison Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder={`${data?.name}`}
                required
                disabled
                value={data?.name}
                
              
              />
            </div>
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
            Add product
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddTeams;