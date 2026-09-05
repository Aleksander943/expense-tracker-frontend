"use client";

import { AdicionarTransaction } from "@/components/adicionarTransacao/adicionarTransaction";
import type { Transacao } from "@/app/type/type";
import { Filtro } from "@/components/filtro/filtro";
import { NavBar } from "@/components/navbar/navbar";
import api from "@/services/api";
import { Menu, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Categorias } from "@/components/categorias/categorias";
import { TransacoesRecentes } from "@/components/transacoesRecentes/transacoesRecentes";

export const Despesas = () => {
  const [receita, setReceita] = useState<Transacao[]>([]);
  const [openAdicionar, setOpenAdicionar] = useState(false);
  const [periodo, setPeriodo] = useState<"mes" | "3meses" | "ano">("mes");
  const [busca, setBusca] = useState<string>("");

  const infoDespesas = async () => {
    try {
      const response = await api.get("/transactions");
      const data = response?.data;
      const filter = data.filter((item: Transacao) => item.type === "despesa");
      setReceita(filter);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    infoDespesas();
  }, []);

  // const filtroBusca = receita?.filter(({ description }) =>
  //   description?.toLowerCase().includes(busca?.toLowerCase()),
  // );

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
                Despesas
              </h1>
              <p>Acompanhe todas as suas saídas financeiras</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-1 bg-red-700 rounded-2xl p-5 text-[#eff5f1] flex flex-col justify-between min-h-[110px]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 uppercase tracking-widest">
                  Total recebido
                </span>
              </div>
              <div>
                <p
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {(receita ?? [])
                    .reduce((total, item) => total + item.value, 0)
                    .toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                </p>
                <p className="text-[11px] text-white/50 mt-1">
                  Atualizado agora
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-[#e4e0d2]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9a9a94] uppercase tracking-widest">
                  Receita média
                </span>
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-semibold text-[#1a1a18] tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {(receita?.length
                    ? receita.reduce((acc, cur) => acc + cur.value, 0) /
                      receita.length
                    : 0
                  ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-[11px] text-[#9a9a94] mt-1">Este mês</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-[#e4e0d2]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9a9a94] uppercase tracking-widest">
                  Maior Receita
                </span>
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-semibold text-[#1a1a18] tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {receita?.length
                    ? Math.max(
                        ...receita.map((item) => item.value),
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : 0}
                </p>
                <p className="text-[11px] text-[#9a9a94] mt-1">Este mês</p>
              </div>
            </div>

            {/* Despesas */}
            <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-[#e4e0d2]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9a9a94] uppercase tracking-widest">
                  Lançamentos
                </span>
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-semibold text-[#1a1a18] tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {receita?.length}
                </p>
                <p className="text-[11px] text-[#9a9a94] mt-1">Este mês</p>
              </div>
            </div>
          </div>

          <Filtro
            periodo={periodo}
            setPeriodo={setPeriodo}
            busca={busca}
            setBusca={setBusca}
            colorButton="bg-red-700 text-white"
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <div className="overflow-hidden rounded-2xl border border-[#e4e0d2] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#f0ece0] px-5 py-4 sm:px-6">
                <h2
                  className="text-sm font-semibold text-[#1a1a18]"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Transações recentes
                </h2>
              </div>

              <TransacoesRecentes transaction={receita} />
            </div>

            <Categorias />
          </div>

          <div className="flex justify-end m-10">
            <button
              onClick={() => setOpenAdicionar(true)}
              className="group fixed bottom-18 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1f4d3a] to-[#2d6a4f] text-white shadow-lg transition-all duration-300 hover:w-36 hover:shadow-xl"
            >
              <Plus className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:rotate-90" />

              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[80px] group-hover:opacity-100">
                Adicionar
              </span>
            </button>
            <AdicionarTransaction
              open={openAdicionar}
              setOpen={setOpenAdicionar}
              atualizar={infoDespesas}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
