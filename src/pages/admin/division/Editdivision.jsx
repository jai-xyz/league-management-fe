import React from 'react'
import ApiService from '../../../services/api-service'
import { useParams } from 'react-router-dom'
import { TextField, Button } from '@mui/material';
import { useState , useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Editdivision = () => {
    const{id} = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
            name: '',
        });
    const [error, setError] = useState(null);

     useEffect(() => {
    const fetch = async () => {
      try {
        const response = await ApiService.get(`divisions/${id}`);
        const division = response.data;
        if (response.status === 200) {
          setForm({
          name: division.name,
          
        });
        }
      } catch (error) {
        console.error('Error fetching division:', error);
      }
    };
  
    fetch(); 
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await ApiService.put(`divisions/${id}`, {
            name: form.name,
        });
        if (response.status === 200) {
            // Show success alert
            await Swal.fire({
                title: 'Division Updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate('/admin/division');
        }
    } catch (error) {
       if(error.response?.status === 422){
        setError(error.response.data.error);
       }
    }
  
  }

  return (
   <div>
               <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                   <div className='flex flex-col gap-4'>
                       <TextField
                          error = {error?.name ? true : false}
                           helperText={error?.name}
                           id="standard-basic"
                           label="Division Name"
                           variant="standard"
                           value={form.name}
                           onChange={(e) =>setForm({ ...form, name: e.target.value })}
                           
                       />
                       <Button type="submit" variant="contained">
                           Update Division
                       </Button>
                   </div>
               </form>
           </div>
  )
}

export default Editdivision
