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
} from "lucide-react";
import { useEffect, useState } from "react";

// ── Mock data ──────────────────────────────────────────────
const transactions = [{}];

const categories = [
  { label: "Alimentação", spent: 520.4, budget: 800, color: "#f59e0b" },
  { label: "Transporte", spent: 310.0, budget: 400, color: "#6366f1" },
  { label: "Moradia", spent: 1450.0, budget: 1500, color: "#ec4899" },
  { label: "Saúde", spent: 214.8, budget: 300, color: "#ef4444" },
  { label: "Lazer", spent: 98.0, budget: 250, color: "#14b8a6" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ArrowUpRight, label: "Receitas", active: false },
  { icon: ArrowDownLeft, label: "Despesas", active: false },
  { icon: Wallet, label: "Contas", active: false },
  { icon: LineChart, label: "Relatórios", active: false },
];

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const [valor, setValor] = useState<Valores>({
    Receita: 0,
    Despesas: 0,
    Total: 0,
  });

  useEffect(() => {
    const Informacoes = async () => {
      try {
        const valores = await api.get("/transactions");
        const requisicao = valores.data;

        const Receita = requisicao
          .filter((item: any) => item.type === "receita")
          .reduce((total: number, item: any) => total + item.value, 0);

        const Despesas = requisicao
          .filter((item: any) => item.type === "despesa")
          .reduce((total: number, item: any) => total + item.value, 0);

        const Total = Receita - Despesas;

        setValor({
          Receita,
          Despesas,
          Total,
        });
      } catch (error) {
        console.log(error);
      }
    };
    Informacoes();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f1ea] flex font-[Inter,system-ui,sans-serif] text-[#1a1a18]">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}
      {/* ── Sidebar ──────────────────────────────────── */}
      <NavBar />
      {/* ── Main ─────────────────────────────────────── */}
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
                className="text-lg sm:text-xl font-semibold text-[#1a1a18] tracking-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Bem-vindo de volta, #TODO !
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-[#e4e0d2] transition-colors">
              <Bell className="w-4 h-4 text-[#9a9a94]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#2d6a4f] rounded-full" />
            </button>
            {/* recolher sidebar — desktop only */}
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
                  {valor.Total.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}
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
                  {valor.Receita.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}
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
                  {valor.Despesas.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}
                </p>
                <p className="text-[11px] text-[#9a9a94] mt-1">Este mês</p>
              </div>
            </div>
          </div>

          {/* ── Transações + Categorias ── */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
            {/* Transações recentes */}
            <div className="bg-white rounded-2xl border border-[#e4e0d2] overflow-hidden">
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#f0ece0]">
                <h2
                  className="text-sm font-semibold text-[#1a1a18]"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Transações recentes
                </h2>
                <button className="text-xs text-[#2d6a4f] font-medium hover:opacity-70 transition-opacity">
                  Ver todas
                </button>
              </div>

              <ul className="divide-y divide-[#f0ece0]"></ul>
            </div>

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

              <ul className="px-5 sm:px-6 py-4 space-y-4">
                {categories.map((cat) => {
                  const pct = Math.min((cat.spent / cat.budget) * 100, 100);
                  const over = cat.spent > cat.budget;
                  return (
                    <li key={cat.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: cat.color }}
                          />
                          <span className="text-sm font-medium text-[#1a1a18]">
                            {cat.label}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-medium ${over ? "text-[#dc2626]" : "text-[#9a9a94]"}`}
                        >
                          {cat.spent}
                          <span className="hidden sm:inline">
                            {" "}
                            / {cat.budget}
                          </span>
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#f0ece0] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: over ? "#dc2626" : cat.color,
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mx-5 sm:mx-6 mb-5 mt-1 p-3 bg-[#f8f6f0] rounded-xl flex items-center justify-between">
                <span className="text-xs text-[#9a9a94]">Total gasto</span>
                <span className="text-sm font-semibold text-[#1a1a18]">
                  {categories.reduce((a, c) => a + c.spent, 0)}
                </span>
              </div>
            </div>
          </div>
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
