import api from "@/services/api";
import Cookies from "js-cookie";
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
      const token = Cookies.get('token');
      if (!token) return;
      try {
        const response = await api.get('/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    usuario();
  }, []);
  
  return(
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}