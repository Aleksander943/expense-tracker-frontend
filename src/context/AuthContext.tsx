import api from "@/services/api";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  user: User
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({children}: AuthProviderProps) =>{
  const [user, setUser] = useState({
  name: "",
  email: "",
});
  useEffect(() => {
    const usuario = async() => {
      const response = await api.get("/me");
      setUser(response.data)
     }

     usuario();
  },[])

  
  
  return(
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}