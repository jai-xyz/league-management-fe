import {React, useState, useContext} from 'react'
import ApiService from '../../services/api-service'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../provider/appContext'
import Cookies from 'js-cookie'
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Typography
} from '@mui/material';

const Login = () => {

  const {setToken} = useContext(AppContext)

  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  
  const handleSubmit = async (e)  => {
    e.preventDefault();
    try {
      const response = await ApiService.post('/login', form);
      const { token } = response.data;
      if (response.status === 200) {
        Cookies.set('token', token, { expires: 7 }); // Set cookie to expire in 7 days
        setToken(token);
        navigate('/dashboard');
      }
      
    } catch (error) {
      console.error('Error logging in:', error);
      
    }
    
  }

  return (
    // <div className='flex flex-col items-center justify-center h-screen'>
    //   <TextField
    //    variant="outlined"
    //     label="email" 
    //     value={form.email}
    //     onChange={(e) => setForm({...form,email:e.target.value})} 
    //     />
    //   <TextField 
    //     variant="outlined" 
    //     label="password" type="password"
    //     value={form.password}
    //     onChange={(e)=> setForm({...form,password:e.target.value})}
    //     />
    //   <button 
    //   className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
    //   type="submit"
    //   onClick={handleSubmit}
    //   >
    //     login
    //   </button>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col items-center mb-6">
        {/* <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5" className="mt-2">
          Sign in
        </Typography>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="flex justify-between items-center mt-2">
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="mt-4 mb-3"
        >
          Sign In
        </Button>
          <div className="mt-3">
          <Typography variant="body2" align="center">
                    {"Don't have an account? "}
                    <Link href="/register" variant="body2">
                      Sign Up
                    </Link>
                  </Typography>
          </div>
      </form>
    </div>
  </div>
  )
}

export default Login
