import api from "@/services/api";
import Cookies from "js-cookie";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const token = Cookies.get("token");

      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        try {
          const response = await api.get("/me");
          setUser(response.data);
        } catch (error) {
          console.error("Token inválido ou expirado:", error);
          Cookies.remove("token");
          delete api.defaults.headers.common.Authorization;
        }
      }

      setLoading(false);
    };

    loadStorageData();
  }, []);

  const login = async (token: string) => {
    Cookies.set("token", token, { path: "/", expires: 7 });
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await api.get("/me");
    setUser(response.data);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1ea]">
        <p className="text-sm text-[#9a9a94]">Carregando...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};
