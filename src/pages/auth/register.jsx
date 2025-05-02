import React from 'react'
import { useState } from 'react'
import ApiService from '../../services/api-service'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Button,
  TextField,
  Link,
  Typography
} from '@mui/material';

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
    // <div className='flex flex-col items-center justify-center h-screen'>
    //      <TextField
    //        variant="outlined"
    //         label="name" 
    //         value={form.name}
    //         onChange={(e) => setForm({...form,name:e.target.value})} 
    //         />
    //       <TextField
    //        variant="outlined"
    //         label="email" 
    //         value={form.email}
    //         onChange={(e) => setForm({...form,email:e.target.value})} 
    //         />
    //       <TextField 
    //         variant="outlined" 
    //         label="password" type="password"
    //         value={form.password}
    //         onChange={(e)=> setForm({...form,password:e.target.value})}
    //         />
    //          <TextField 
    //         variant="outlined" 
    //         label="Confirm Password" type="password"
    //         value={form.confirm_password}
    //         onChange={(e)=> setForm({...form,confirm_password:e.target.value})}
    //         />
    //       <button 
    //       className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
    //       type="submit"
    //       onClick={handleSubmit}
    //       >
    //         Register
    //       </button>
    //     </div>
         <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
         <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
           <div className="flex flex-col items-center mb-6">
             {/* <Avatar sx={{ bgcolor: 'primary.main' }}>
               <PersonAddIcon />
             </Avatar> */}
             <Typography component="h1" variant="h5" className="mt-2">
               Register
             </Typography>
           </div>
   
           <form onSubmit={handleSubmit}>
             <TextField
               fullWidth
               margin="normal"
               label="Full Name"
               name="name"
               value={form.name}
               onChange={(e) => setForm({ ...form, name: e.target.value })}
               required
             />
             <TextField
               fullWidth
               margin="normal"
               label="Email Address"
               name="email"
               type="email"
               value={form.email}
               onChange={(e) => setForm({ ...form, email: e.target.value })}  
               required
             />
             <TextField
               fullWidth
               margin="normal"
               label="Password"
               name="password"
               type="password"
               value={form.password}
               onChange={(e) => setForm({ ...form, password: e.target.value })}
               required
             />
             <TextField
               fullWidth
               margin="normal"
               label="Confirm Password"
               name="confirmPassword"
               type="password"
               value={form.confirm_password}
               onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
               required
             />
              <div className='my-4'>
                <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Register
              </Button>
              </div>
  
             <Typography variant="body2" align="center">
               Already have an account?{' '}
               <Link href="/login" variant="body2">
                 Sign in
               </Link>
             </Typography>
           </form>
         </div>
       </div>
  )
}

export default Register
