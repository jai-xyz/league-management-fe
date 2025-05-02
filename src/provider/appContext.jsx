import { useEffect, useState, createContext } from "react";
import ApiService from "../services/api-service";
// import {AppContext} from "./appProvider";
import Cookies from "js-cookie";

export const AppContext = createContext();

export default function AppProvider({children}) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get('token') || null);
  
 async function getUser() {
  try {
    const res = await ApiService.get('/user',{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await res.data;
    setUser(data);

  } catch (error) {
    console.error('Error getting user data:', error);
    
  }
 }

 useEffect (() => {
  getUser();
 }, [token]);
  
  return (
    <AppContext.Provider value={{ user,setToken,token }}>
      {children}
    </AppContext.Provider>
  );
} 