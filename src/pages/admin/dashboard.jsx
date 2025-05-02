import React from 'react'
import { Button } from '@mui/material'
import Cookies from 'js-cookie';
import { AppContext } from '../../provider/appContext'
import { useContext } from 'react'
import ApiService from '../../services/api-service';

const Dashboard = () => {

  const {token,setToken} = useContext(AppContext)

  async function handleLogout(e) {
    e.preventDefault();
   try {
    const response = await ApiService.post('/Auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if(response.status === 200){
      Cookies.remove('token'); // Remove the token cookie
      setToken(null); // Clear the token in state 
    }
   }  catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Logout endpoint not found (404). Please check the API.');
    } else {
      console.error('Error logging out:', error);
    }
  }
  }

  return (
    <div>
      <h1>dashboard</h1>
      <Button variant="contained" onClick={handleLogout}>logout</Button>
    </div>
  )
}

export default Dashboard
