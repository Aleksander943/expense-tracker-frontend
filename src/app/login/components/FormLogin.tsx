"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ChartLine } from "lucide-react";
import axios from "axios";

import { useState } from "react";

export function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1.05fr_1fr] bg-[#f7f7f4]">
      {/* keyframes for the ambient chart art on the brand panel */}
      <style>{`
        @keyframes finlyDraw { to { stroke-dashoffset: 0; } }
        @keyframes finlyPop { to { opacity: 1; } }
        .finly-plot {
          fill: none; stroke: #7fcba0; stroke-width: 2;
          stroke-linecap: round; stroke-linejoin: round;
          stroke-dasharray: 600; stroke-dashoffset: 600;
          animation: finlyDraw 2.4s ease forwards 0.3s;
        }
        .finly-plot-soft {
          fill: none; stroke: rgba(255,255,255,0.28); stroke-width: 1.4;
          stroke-linecap: round; stroke-linejoin: round;
          stroke-dasharray: 600; stroke-dashoffset: 600;
          animation: finlyDraw 2.4s ease forwards 0.55s;
        }
        .finly-dot {
          fill: #eff5f1; opacity: 0;
          animation: finlyPop 0.4s ease forwards;
        }
      `}</style>

      {/* Brand panel — desktop only */}
      <div className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-gradient-to-br from-[#16302a] via-[#1f4d3a] to-[#2d6a4f] text-[#eff5f1] px-16 py-14">
        <svg
          className="absolute inset-0 w-full h-full opacity-90"
          viewBox="0 0 600 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.06)" />
          <line x1="0" y1="260" x2="600" y2="260" stroke="rgba(255,255,255,0.06)" />
          <line x1="0" y1="400" x2="600" y2="400" stroke="rgba(255,255,255,0.06)" />
          <line x1="0" y1="540" x2="600" y2="540" stroke="rgba(255,255,255,0.06)" />
          <line x1="0" y1="680" x2="600" y2="680" stroke="rgba(255,255,255,0.06)" />

          <polyline
            className="finly-plot-soft"
            points="0,620 80,600 160,560 240,580 320,500 400,520 480,440 560,460 640,400"
          />
          <polyline
            className="finly-plot"
            points="0,560 80,580 160,500 240,520 320,440 400,460 480,360 560,380 640,300"
          />

          <circle className="finly-dot" cx="320" cy="440" r="5" style={{ animationDelay: "1.6s" }} />
          <circle className="finly-dot" cx="480" cy="360" r="5" style={{ animationDelay: "1.9s" }} />
          <circle className="finly-dot" cx="640" cy="300" r="5" style={{ animationDelay: "2.2s" }} />
        </svg>

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
            <ChartLine className="w-4 h-4 text-[#eff5f1]" />
          </div>
          <span className="font-semibold tracking-tight text-sm">Finly</span>
        </div>

        <div className="relative z-10 max-w-md">
          <p className="text-xs uppercase tracking-[0.12em] text-[#bfe0cc]/85 mb-3">
            Controle financeiro
          </p>
          <h1
            className="text-3xl font-semibold tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Visão clara para decisões financeiras melhores.
          </h1>
          <p className="text-sm leading-relaxed text-[#d7e6dc]">
            Acompanhe gastos, metas e investimentos em um só lugar — com a
            segurança que seus dados merecem.
          </p>
        </div>

        <div className="relative z-10 hidden xl:flex gap-7 border-t border-white/15 pt-5">
         
         
          <div>
            <b className="block font-semibold text-lg" style={{ fontFamily: "'Georgia', serif" }}>
            Controle sua vida financeira
            </b>
            
          </div>
        </div>
      </div>

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
              Bem-vindo de volta
            </p>
            <h1
              className="text-2xl lg:text-[28px] font-semibold text-[#1a1a18] tracking-tight leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Acesse sua conta
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700 font-medium">⚠️ {error}</p>
            </div>
          )}

          {/* Form — mantendo sua estrutura original */}
          <form className="flex flex-col gap-3" >
            {/* Email */}
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

            {/* Senha */}
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

            {/* Forgot */}
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                className="text-xs text-[#2d6a4f] font-medium hover:opacity-70 transition-opacity"
              >
                Esqueci a senha
              </button>
            </div>

            {/* Submit — mantendo seu input type submit */}
            <input
              type="submit"
              value={loading ? "Entrando..." : "Entrar"}
              disabled={loading}
              className="mt-1 w-full bg-[#2d6a4f] hover:bg-[#235c43] active:scale-[0.99] text-white font-medium text-sm py-3 rounded-xl cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </form>

          {/* Signup */}
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