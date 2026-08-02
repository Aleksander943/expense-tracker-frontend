'use client'

import api from "@/services/api";
import { useEffect, useState } from "react";

interface usuario {
  id: number;
  name: string;
  email: string
}

export const AuthContext = () => {
  const [usuario, setUsuario] =  useState< usuario | null >(null);

  const informacaoUser = async () => {
    try {
      const response = await api.get("/me");
      setUsuario(response.data)
      
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    informacaoUser();
  },[])

};