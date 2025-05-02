import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import {AppContext} from '../provider/appContext'
import ApiService from '../services/api-service';

const ProtectedRoutes = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const {token} = useContext(AppContext);


  useEffect(() => {
    // Check if the token is valid by making a request to a protected route

    ApiService.get('/user',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response && response.status === 200) {
        setIsAuthenticated(true);
      }else {
        setIsAuthenticated(false);
      }
    })
    .catch(error => {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
    });
  } , [token]);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return (
    <>
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" /> }
      
    </>
  )
}

export default ProtectedRoutes
