import React from 'react'
import { TextField } from '@mui/material'
import { useState } from 'react'
import ApiService from '../../services/api-service'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.post('/register', form);
            console.log(response.data);
            navigate('/login')
        } catch (error) {
            console.error('Error registering:', error);
        }
    }


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
         <TextField
           variant="outlined"
            label="name" 
            value={form.name}
            onChange={(e) => setForm({...form,name:e.target.value})} 
            />
          <TextField
           variant="outlined"
            label="email" 
            value={form.email}
            onChange={(e) => setForm({...form,email:e.target.value})} 
            />
          <TextField 
            variant="outlined" 
            label="password" type="password"
            value={form.password}
            onChange={(e)=> setForm({...form,password:e.target.value})}
            />
             <TextField 
            variant="outlined" 
            label="Confirm Password" type="password"
            value={form.confirm_password}
            onChange={(e)=> setForm({...form,confirm_password:e.target.value})}
            />
          <button 
          className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
          type="submit"
          onClick={handleSubmit}
          >
            Register
          </button>
        </div>
  )
}

export default Register
