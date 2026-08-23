"use client";

import { NavBar } from "@/components/navbar/navbar";
import { Bell, Menu, MoreHorizontal, Plus } from "lucide-react";
import { Grafico } from "./graficoEstatistica";
import api from "@/services/api";
import { useEffect, useState } from "react";
import type { Transacao } from "@/app/type/type";
import { Mes } from "../../type/data";

type transacaoType = {
  Receita: number;
  Despesas: number;
};

export type dadosMesType = {
  id: number;
  abreviacao: string;
  Receita: number;
  Despesas: number;
};

export const Relatorio = () => {
  const [total, setTotal] = useState<transacaoType>();
  const [dadosPorMes, setDadosPorMes] = useState<dadosMesType[]>([]);

  useEffect(() => {
  const informacao = async () => {
    try {
      const valores = await api.get<Transacao[]>("/transactions");

      const requisicao = valores.data;

      const agora = new Date().getMonth() + 1;

      const meses = Mes.filter(({ id }) => id <= agora).slice(-6);

      const Receita = requisicao
        .filter((item) => item.type === "receita")
        .reduce((total, item) => total + item.value, 0);

      const Despesas = requisicao
        .filter((item) => item.type === "despesa")
        .reduce((total, item) => total + item.value, 0);

      const dadosPorMes = meses.map((mes) => {
        const transacoesDoMes = requisicao.filter((item) => {
          const data = new Date(item.createdAt);

          return data.getMonth() + 1 === mes.id;
        });

        const Receita = transacoesDoMes
          .filter((item) => item.type === "receita")
          .reduce((total, item) => total + item.value, 0);

        const Despesas = transacoesDoMes
          .filter((item) => item.type === "despesa")
          .reduce((total, item) => total + item.value, 0);

        return {
          id: mes.id,
          abreviacao: mes.abreviacao,
          Receita,
          Despesas,
        };
      });

      setTotal({
        Receita,
        Despesas,
      });

      setDadosPorMes(dadosPorMes);
    } catch (error) {
      console.log(error);
    }
  };

  
    informacao();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f1ea] flex font-[Inter,system-ui,sans-serif] text-[#1a1a18]">
     <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" />
      <NavBar />
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center justify-between px-4 sm:px-8 py-4 bg-[#f3f1ea] border-b border-[#e4e0d2] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-xl hover:bg-[#e4e0d2] transition-colors">
              <Menu className="w-4 h-4 text-[#9a9a94]" />
            </button>
            <div>
              <h1
                className="text-lg sm:text-3xl font-semibold text-[#1a1a18] tracking-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Relatório
              </h1>
              <p>Visão geral da sua saúde finaceira</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-[#e4e0d2] transition-colors">
              <Bell className="w-4 h-4 text-[#9a9a94]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#2d6a4f] rounded-full" />
            </button>

            <button className="hidden lg:block text-xs text-[#9a9a94] hover:text-[#1a1a18] transition-colors px-2 py-1 rounded-lg hover:bg-[#e4e0d2]"></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-[#e4e0d2]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9a9a94] uppercase tracking-widest">
                  Total de receitas
                </span>
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-semibold text-[#1a1a18] tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {total?.Receita.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-[11px] text-[#9a9a94] mt-1">
                  Últimos 6 meses
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-[#e4e0d2]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9a9a94] uppercase tracking-widest">
                  Total de despesas
                </span>
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-semibold text-[#1a1a18] tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {total?.Despesas.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-[11px] text-[#9a9a94] mt-1">
                  Últimos 6 meses
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <div className="overflow-hidden rounded-2xl border border-[#e4e0d2] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#f0ece0] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-800"></span>
                    <span className="text-sm text-gray-700">Receitas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-700"></span>
                    <span className="text-sm text-gray-700">Despesas</span>
                  </div>
                </div>
              </div>
              <Grafico dadosPorMes={dadosPorMes} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#e4e0d2] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#f0ece0] px-5 py-4 sm:px-6">
                <h2
                  className="text-sm font-semibold text-[#1a1a18]"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Categorias
                </h2>
                <button className="rounded-lg p-1 transition-colors hover:bg-[#f0ece0]">
                  <MoreHorizontal className="h-4 w-4 text-[#9a9a94]" />
                </button>
              </div>

              <div className="space-y-3 p-4 sm:p-6 text-center">
                Em desenvolvimento
              </div>
            </div>
          </div>

          <div className="flex justify-end m-10">
            <button className="group fixed bottom-18 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1f4d3a] to-[#2d6a4f] text-white shadow-lg transition-all duration-300 hover:w-36 hover:shadow-xl">
              <Plus className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:rotate-90" />

              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[80px] group-hover:opacity-100">
                Adicionar
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
