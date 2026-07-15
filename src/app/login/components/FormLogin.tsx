"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ChartLine} from "lucide-react";


import { useState } from "react";
import { Estilizacao } from "./estilizacao";

export function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1.05fr_1fr] bg-[#f7f7f4]">
      <Estilizacao />

      <div className="min-h-screen lg:min-h-0 flex items-center justify-center px-8 lg:px-16 lg:bg-[#f8f6f0]">
        <div className="w-full max-w-sm lg:max-w-md bg-white lg:bg-transparent rounded-2xl lg:rounded-none shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_40px_rgba(0,0,0,0.08)] lg:shadow-none px-8 py-12 lg:px-0 lg:py-0">
  
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#2d6a4f] rounded-lg flex items-center justify-center">
              <ChartLine className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-[#1a1a18] tracking-tight text-sm">
              Finly
            </span>
          </div>


          <div className="mb-6">
            <p className="text-xs text-[#9a9a94] mb-1 tracking-wide">
              Bem-vindo de volta
            </p>
            <h1
              className="text-2xl lg:text-[28px] font-semibold text-[#1a1a18] tracking-tight leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Acesse sua conta
            </h1>
          </div>

      
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700 font-medium">⚠️ {error}</p>
            </div>
          )}

  
          <form className="flex flex-col gap-3">
       
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4c4bc]">
                <Mail className="w-4 h-4" />
              </span>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-white w-full pl-9 pr-3 py-3 border border-[#ebebeb] rounded-xl text-sm text-[#1a1a18] placeholder-[#c4c4bc] outline-none transition-all focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/10"
              />
            </div>

       
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4c4bc]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="bg-white w-full pl-9 pr-14 py-3 border border-[#ebebeb] rounded-xl text-sm text-[#1a1a18] placeholder-[#c4c4bc] outline-none transition-all focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[#9a9a94] hover:text-[#1a1a18] transition-colors"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

      
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                className="text-xs text-[#2d6a4f] font-medium hover:opacity-70 transition-opacity"
              >
                Esqueci a senha
              </button>
            </div>

           
            <input
              type="submit"
              value={loading ? "Entrando..." : "Entrar"}
              disabled={loading}
              className="mt-1 w-full bg-[#2d6a4f] hover:bg-[#235c43] active:scale-[0.99] text-white font-medium text-sm py-3 rounded-xl cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </form>

  
          <p className="text-center text-xs text-[#9a9a94] mt-5">
            Ainda não tem conta?{" "}
            <Link
              href="/register"
              className="text-[#2d6a4f] font-medium hover:opacity-70 transition-opacity"
            >
              Criar gratuitamente
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
