import { TextField } from '@mui/material'
import {React, useState} from 'react'
import ApiService from '../../services/api-service'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  
  const handleSubmit = async (e)  => {
    e.preventDefault();
    try {
      const response = await ApiService.post('/login', form);
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      
    }
    
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
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
      <button 
      className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
      type="submit"
      onClick={handleSubmit}
      >
        login
      </button>
    </div>
  )
}

export default Login
