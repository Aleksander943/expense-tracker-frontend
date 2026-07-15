"use client";

import { Mail, Lock, User, ChartLine } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Estilizacao } from "./estilizacao";


type FormData = {
nome: string
email: string
password: string
confirmPassword: string
}

export function FormRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
  } = useForm<FormData>();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1.05fr_1fr] bg-[#f7f7f4]">
      <Estilizacao />
      {/* Form panel */}
      <div className="min-h-screen lg:min-h-0 flex items-center justify-center px-8 lg:px-16 lg:bg-[#f8f6f0]">
        <div className="w-full max-w-sm lg:max-w-md bg-white lg:bg-transparent rounded-2xl lg:rounded-none shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_40px_rgba(0,0,0,0.08)] lg:shadow-none px-8 py-12 lg:px-0 lg:py-0">
          {/* Logo — mobile only, desktop shows the brand panel logo instead */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#2d6a4f] rounded-lg flex items-center justify-center">
              <ChartLine className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-[#1a1a18] tracking-tight text-sm">
              Finly
            </span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <p className="text-xs text-[#9a9a94] mb-1 tracking-wide">
              Comece agora
            </p>
            <h1
              className="text-2xl lg:text-[28px] font-semibold text-[#1a1a18] tracking-tight leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Crie sua conta
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700 font-medium">⚠️ {error}</p>
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-3">
            {/* Nome */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4c4bc]">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                {...register("nome")}
                placeholder="Nome completo"
                className="bg-white w-full pl-9 pr-3 py-3 border border-[#ebebeb] rounded-xl text-sm text-[#1a1a18] placeholder-[#c4c4bc] outline-none transition-all focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/10"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4c4bc]">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                {...register("email")}
                placeholder="seu@email.com"
                className="bg-white w-full pl-9 pr-3 py-3 border border-[#ebebeb] rounded-xl text-sm text-[#1a1a18] placeholder-[#c4c4bc] outline-none transition-all focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/10"
              />
            </div>

            {/* Senha */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4c4bc]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                {...register("password")}
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

            {/* Confirmar senha */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4c4bc]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                {...register("confirmPassword")}
                placeholder="Confirme a senha"
                className="bg-white w-full pl-9 pr-14 py-3 border border-[#ebebeb] rounded-xl text-sm text-[#1a1a18] placeholder-[#c4c4bc] outline-none transition-all focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[#9a9a94] hover:text-[#1a1a18] transition-colors"
              ></button>
            </div>

            {/* Submit */}
            <input
              type="submit"
              value={loading ? "Criando conta..." : "Criar conta"}
              disabled={loading}
              className="mt-2 w-full bg-[#2d6a4f] hover:bg-[#235c43] active:scale-[0.99] text-white font-medium text-sm py-3 rounded-xl cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </form>

          {/* Login link */}
          <p className="text-center text-xs text-[#9a9a94] mt-5">
            Já tem uma conta?{" "}
            <Link
              href="/"
              className="text-[#2d6a4f] font-medium hover:opacity-70 transition-opacity"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
