import React from 'react'
import ApiService from '../../../services/api-service'
import { useParams } from 'react-router-dom'
import { TextField, Button } from '@mui/material';
import { useState , useEffect } from 'react';
const Editdivision = () => {
    const{id} = useParams();
    const [form, setForm] = useState({
            name: '',
        });

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
            console.log('Division updated successfully');
        }
    } catch (error) {
        console.error('Error updating division:', error);
    }
  
  }


  return (
   <div>
               <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                   <div className='flex flex-col gap-4'>
                       <TextField
                           id="standard-basic"
                           label="Division Name"
                           variant="standard"
                           value={form.name}
                           onChange={(e) =>setForm({ ...form, name: e.target.value })}
                           required
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
