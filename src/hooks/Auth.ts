import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

export const UseAuth = () =>{
  const provider = useContext(AuthContext)

  if(!provider){
    throw("Ocorreu um error")
  };

  return provider;
}