import api from "@/services/api";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  user: User;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    const usuario = async () => {
      try {
        const response = await api.get("/me");

        console.log("Resposta do /me:", response.data);

        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    usuario();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
