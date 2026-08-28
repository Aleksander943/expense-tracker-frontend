"use client";

import { NavBar } from "@/components/navbar/navbar";
import api from "@/services/api";
import {
  LineChart,
  LayoutDashboard,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Bell,
  Menu,
  Plus,
  Pencil,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AdicionarTransaction } from "../../../components/adicionarTransacao/adicionarTransaction";
import { UseAuth } from "@/hooks/Auth";
import type { Valores } from "./type/valores";
import type { Transacao } from "@/app/type/type";
import { DeletarTransacao } from "@/components/deletarTransacao/deletar";
import { EditarTransaction } from "@/components/editarTransacao/editar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ArrowUpRight, label: "Receitas", active: false },
  { icon: ArrowDownLeft, label: "Despesas", active: false },
  { icon: Wallet, label: "Contas", active: false },
  { icon: LineChart, label: "Relatórios", active: false },
];

export function Dashboard() {
  const { user } = UseAuth();
  const [openAdicionar, setOpenAdicionar] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] =
    useState<Transacao | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const [transaction, setTransacion] = useState<Transacao[]>([]);
  const [valor, setValor] = useState<Valores>({
    Receita: 0,
    Despesas: 0,
    Total: 0,
  });

  useEffect(() => {
    const Informacoes = async () => {
      try {
        const valores = await api.get<Transacao[]>("/transactions");
        const requisicao = valores.data;

        const Receita = requisicao
          .filter((item: Transacao) => item.type === "receita")
          .reduce((total: number, item: Transacao) => total + item.value, 0);

        const Despesas = requisicao
          .filter((item: Transacao) => item.type === "despesa")
          .reduce((total: number, item: Transacao) => total + item.value, 0);

        const Total = Receita - Despesas;

        setValor({
          Receita,
          Despesas,
          Total,
        });
        setTransacion(requisicao);
      } catch (error) {
        console.log(error);
      }
    };

    Informacoes();
  }, []);

  console.log(transacaoSelecionada);

  return (
    <div className="min-h-screen bg-[#f3f1ea] flex font-[Inter,system-ui,sans-serif] text-[#1a1a18]">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}
      <NavBar />
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center justify-between px-4 sm:px-8 py-4 bg-[#f3f1ea] border-b border-[#e4e0d2] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-[#e4e0d2] transition-colors"
              onClick={() => setMobileMenu(true)}
            >
              <Menu className="w-4 h-4 text-[#9a9a94]" />
            </button>
            <div>
              <h1
                className="text-lg sm:text-3xl font-semibold text-[#1a1a18] tracking-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Bem-vindo de volta,{" "}
                {user?.name
                  ? user.name.charAt(0).toUpperCase() +
                    user.name.slice(1).toLowerCase()
                  : ""}{" "}
                !
              </h1>
              <p>Acompanhe suas receitas, despesas e metas em um só lugar.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-[#e4e0d2] transition-colors">
              <Bell className="w-4 h-4 text-[#9a9a94]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#2d6a4f] rounded-full" />
            </button>

            <button
              className="hidden lg:block text-xs text-[#9a9a94] hover:text-[#1a1a18] transition-colors px-2 py-1 rounded-lg hover:bg-[#e4e0d2]"
              onClick={() => setSidebarOpen((p) => !p)}
            >
              {sidebarOpen ? "◂" : "▸"}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1 bg-gradient-to-br from-[#1f4d3a] to-[#2d6a4f] rounded-2xl p-5 text-[#eff5f1] flex flex-col justify-between min-h-[110px]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 uppercase tracking-widest">
                  Saldo atual
                </span>
                <div className="flex items-center gap-1 text-[10px] bg-white/15 rounded-full px-2 py-0.5">
                  <TrendingUp className="w-3 h-3" />
                  #Pecentual de crescimento#
                </div>
              </div>
              <div>
                <p
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {valor.Total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-[11px] text-white/50 mt-1">
                  Atualizado agora
                </p>
              </div>
            </div>

            {/* Receitas */}
            <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-[#e4e0d2]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9a9a94] uppercase tracking-widest">
                  Receitas
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#dcfce7] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#16a34a]" />
                </div>
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-semibold text-[#1a1a18] tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {valor.Receita.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-[11px] text-[#9a9a94] mt-1">Este mês</p>
              </div>
            </div>

            {/* Despesas */}
            <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-[#e4e0d2]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9a9a94] uppercase tracking-widest">
                  Despesas
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#fee2e2] flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-[#dc2626]" />
                </div>
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-semibold text-[#1a1a18] tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {valor.Despesas.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-[11px] text-[#9a9a94] mt-1">Este mês</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <div className="overflow-hidden rounded-2xl border border-[#e4e0d2] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#f0ece0] px-5 py-4 sm:px-6">
                <h2
                  className="text-sm font-semibold text-[#1a1a18]"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Transações recentes
                </h2>
                <button className="rounded-lg p-1 transition-colors hover:bg-[#f0ece0]">
                  <MoreHorizontal className="h-4 w-4 text-[#9a9a94]" />
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {transaction.length !== 0 ? (
                  transaction.slice(0, 6).map((transactions, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between py-3 px-4 border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                            transactions.type === "receita"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {transactions.type === "receita" ? "↑" : "↓"}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-800 capitalize">
                            {transactions.description}
                          </p>
                          <p className="text-xs text-gray-400 capitalize">
                            {transactions.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        {transactions.type === "receita" ? (
                          <span className="text-sm font-semibold text-emerald-600 tabular-nums">
                            + R$ {transactions.value.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-sm font-semibold text-rose-600 tabular-nums">
                            - R$ {transactions.value.toFixed(2)}
                          </span>
                        )}

                        <button
                          onClick={() => {
                            setOpenEditar(true);
                            setTransacaoSelecionada(transactions);
                          }}
                          className="p-1 text-[#64748B] rounded-lg hover:bg-[#f0ece0] transition-colors"
                        >
                          <Pencil className="h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setOpenDelete(true);
                            setTransacaoSelecionada(transactions);
                          }}
                          className="p-1 text-[#DC2626] rounded-lg hover:bg-[#f0ece0] transition-colors"
                        >
                          <Trash className="h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center px-4 py-5 ">
                    <p>Nenhuma transação cadastrada</p>
                  </div>
                )}
              </div>
            </div>

            {transacaoSelecionada && (
              <EditarTransaction
                open={openEditar}
                onOpenChange={setOpenEditar}
                transacao={transacaoSelecionada}
              />
            )}

            <DeletarTransacao
              open={openDelete}
              onOpenChange={setOpenDelete}
              transacao={transacaoSelecionada}
            />

            {/* Categorias */}
            <div className="bg-white rounded-2xl border border-[#e4e0d2] overflow-hidden">
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#f0ece0]">
                <h2
                  className="text-sm font-semibold text-[#1a1a18]"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Categorias
                </h2>
                <button className="p-1 rounded-lg hover:bg-[#f0ece0] transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-[#9a9a94]" />
                </button>
              </div>
              <div className="flex justify-center py-10">
                <p>Em Desenvolvimento</p>
              </div>
            </div>
          </div>
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
          />
        </div>

        {/* ── Bottom nav — mobile ─────────────────────── */}
        <nav className="lg:hidden flex items-center justify-around border-t border-[#e4e0d2] bg-white px-2 py-3 sticky bottom-0 z-20">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors ${
                active ? "text-[#2d6a4f]" : "text-[#9a9a94]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}
