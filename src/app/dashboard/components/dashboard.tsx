"use client";
 
import {
  LineChart,
  LayoutDashboard,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShoppingCart,
  Utensils,
  Car,
  Zap,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  LogOut,
  ChevronsUpDown,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
 
// ── Mock data ──────────────────────────────────────────────
const transactions = [
  { id: 1, label: "Supermercado Extra",     category: "Alimentação", amount: -287.50, date: "Hoje, 09:14",   icon: ShoppingCart, color: "#f59e0b" },
  { id: 2, label: "Salário — Empresa Ltda", category: "Receita",     amount: 5800.00, date: "Hoje, 08:00",   icon: TrendingUp,   color: "#2d6a4f" },
  { id: 3, label: "iFood",                  category: "Alimentação", amount: -62.90,  date: "Ontem, 20:31",  icon: Utensils,     color: "#f59e0b" },
  { id: 4, label: "Posto Shell",            category: "Transporte",  amount: -180.00, date: "Ontem, 17:05",  icon: Car,          color: "#6366f1" },
  { id: 5, label: "Conta de Luz",           category: "Moradia",     amount: -143.20, date: "09 jul, 14:22", icon: Zap,          color: "#ec4899" },
  { id: 6, label: "Freelance — Design",     category: "Receita",     amount: 1200.00, date: "08 jul, 11:00", icon: TrendingUp,   color: "#2d6a4f" },
  { id: 7, label: "Farmácia São Paulo",     category: "Saúde",       amount: -54.80,  date: "07 jul, 16:40", icon: Wallet,       color: "#ef4444" },
];
 
const categories = [
  { label: "Alimentação", spent: 520.40,  budget: 800,  color: "#f59e0b" },
  { label: "Transporte",  spent: 310.00,  budget: 400,  color: "#6366f1" },
  { label: "Moradia",     spent: 1450.00, budget: 1500, color: "#ec4899" },
  { label: "Saúde",       spent: 214.80,  budget: 300,  color: "#ef4444" },
  { label: "Lazer",       spent: 98.00,   budget: 250,  color: "#14b8a6" },
];
 
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",  active: true  },
  { icon: ArrowUpRight,    label: "Receitas",   active: false },
  { icon: ArrowDownLeft,   label: "Despesas",   active: false },
  { icon: Wallet,          label: "Contas",     active: false },
  { icon: LineChart,       label: "Relatórios", active: false },
];
 
const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
 
export function Dashboard() {
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
 
  const saldo    = 7812.60;
  const receitas = 7000.00;
  const despesas = 1251.40;
 
  return (
    <div className="min-h-screen bg-[#f3f1ea] flex font-[Inter,system-ui,sans-serif] text-[#1a1a18]">
 
      {/* ── Mobile overlay ───────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}
 
      {/* ── Sidebar ──────────────────────────────────── */}
      <aside
        className={`
          fixed lg:relative z-40 lg:z-auto
          flex-shrink-0 flex flex-col h-full lg:h-auto min-h-screen
          bg-gradient-to-b from-[#16302a] via-[#1f4d3a] to-[#2d6a4f]
          text-[#eff5f1] transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${sidebarOpen ? "w-56" : "lg:w-16 w-56"}
        `}
      >
        {/* logo */}
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
            <LineChart className="w-4 h-4 text-[#eff5f1]" />
          </div>
          <span
            className={`font-semibold tracking-tight text-sm whitespace-nowrap transition-opacity duration-200 ${
              sidebarOpen ? "opacity-100" : "lg:opacity-0 lg:w-0 lg:overflow-hidden"
            }`}
          >
            Finly
          </span>
          {/* close on mobile */}
          <button
            className="ml-auto lg:hidden text-white/60 hover:text-white"
            onClick={() => setMobileMenu(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
 
        {/* nav */}
        <nav className="flex flex-col gap-1 px-2 py-4 flex-1">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              onClick={() => setMobileMenu(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-colors text-left w-full
                ${active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
                }
              `}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span
                className={`whitespace-nowrap transition-opacity duration-200 ${
                  sidebarOpen ? "opacity-100" : "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </nav>
 
        {/* user */}
        <div className="px-2 py-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full hover:bg-white/10 transition-colors">
            <div className="w-7 h-7 rounded-full bg-[#52916d] flex items-center justify-center text-xs font-semibold flex-shrink-0 text-white">
              JD
            </div>
            <div
              className={`text-left min-w-0 flex-1 transition-opacity duration-200 ${
                sidebarOpen ? "opacity-100" : "lg:opacity-0 lg:w-0 lg:overflow-hidden"
              }`}
            >
              <p className="text-xs font-medium text-white truncate">João D.</p>
              <p className="text-[10px] text-white/50 truncate">joao@email.com</p>
            </div>
            <ChevronsUpDown
              className={`w-3.5 h-3.5 text-white/40 flex-shrink-0 transition-opacity duration-200 ${
                sidebarOpen ? "opacity-100" : "lg:opacity-0"
              }`}
            />
          </button>
 
          <div className={`flex mt-2 gap-1 ${sidebarOpen ? "justify-end px-1" : "justify-center"}`}>
            <button className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors">
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
 
      {/* ── Main ─────────────────────────────────────── */}
      <main className="flex-1 min-w-0 flex flex-col">
 
        {/* header */}
        <header className="flex items-center justify-between px-4 sm:px-8 py-4 bg-[#f3f1ea] border-b border-[#e4e0d2] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* hamburger — mobile */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-[#e4e0d2] transition-colors"
              onClick={() => setMobileMenu(true)}
            >
              <Menu className="w-4 h-4 text-[#9a9a94]" />
            </button>
            <div>
              <p className="text-xs text-[#9a9a94] mb-0.5">Julho 2026</p>
              <h1
                className="text-lg sm:text-xl font-semibold text-[#1a1a18] tracking-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Bom dia, João 👋
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
 
          {/* ── Cards resumo ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 
            {/* Saldo */}
            <div className="sm:col-span-1 bg-gradient-to-br from-[#1f4d3a] to-[#2d6a4f] rounded-2xl p-5 text-[#eff5f1] flex flex-col justify-between min-h-[110px]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 uppercase tracking-widest">Saldo atual</span>
                <div className="flex items-center gap-1 text-[10px] bg-white/15 rounded-full px-2 py-0.5">
                  <TrendingUp className="w-3 h-3" />
                  +4.2%
                </div>
              </div>
              <div>
                <p
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {fmt(saldo)}
                </p>
                <p className="text-[11px] text-white/50 mt-1">Atualizado agora</p>
              </div>
            </div>
 
            {/* Receitas */}
            <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-[#e4e0d2]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9a9a94] uppercase tracking-widest">Receitas</span>
                <div className="w-8 h-8 rounded-xl bg-[#dcfce7] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#16a34a]" />
                </div>
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-semibold text-[#1a1a18] tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {fmt(receitas)}
                </p>
                <p className="text-[11px] text-[#9a9a94] mt-1">Este mês</p>
              </div>
            </div>
 
            {/* Despesas */}
            <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-[#e4e0d2]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9a9a94] uppercase tracking-widest">Despesas</span>
                <div className="w-8 h-8 rounded-xl bg-[#fee2e2] flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-[#dc2626]" />
                </div>
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-semibold text-[#1a1a18] tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {fmt(despesas)}
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
 
              <ul className="divide-y divide-[#f0ece0]">
                {transactions.map((tx) => {
                  const Icon = tx.icon;
                  const isPositive = tx.amount > 0;
                  return (
                    <li
                      key={tx.id}
                      className="flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-3.5 hover:bg-[#faf9f5] transition-colors"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: tx.color + "18" }}
                      >
                        <Icon className="w-4 h-4" style={{ color: tx.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1a1a18] truncate">{tx.label}</p>
                        <p className="text-[11px] text-[#9a9a94]">
                          <span className="hidden sm:inline">{tx.category} · </span>
                          {tx.date}
                        </p>
                      </div>
                      <span
                        className={`text-sm font-semibold flex-shrink-0 ${
                          isPositive ? "text-[#16a34a]" : "text-[#1a1a18]"
                        }`}
                      >
                        {isPositive ? "+" : ""}{fmt(tx.amount)}
                      </span>
                    </li>
                  );
                })}
              </ul>
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
                  const pct  = Math.min((cat.spent / cat.budget) * 100, 100);
                  const over = cat.spent > cat.budget;
                  return (
                    <li key={cat.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: cat.color }}
                          />
                          <span className="text-sm font-medium text-[#1a1a18]">{cat.label}</span>
                        </div>
                        <span className={`text-xs font-medium ${over ? "text-[#dc2626]" : "text-[#9a9a94]"}`}>
                          {fmt(cat.spent)}
                          <span className="hidden sm:inline"> / {fmt(cat.budget)}</span>
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#f0ece0] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: over ? "#dc2626" : cat.color }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
 
              <div className="mx-5 sm:mx-6 mb-5 mt-1 p-3 bg-[#f8f6f0] rounded-xl flex items-center justify-between">
                <span className="text-xs text-[#9a9a94]">Total gasto</span>
                <span className="text-sm font-semibold text-[#1a1a18]">
                  {fmt(categories.reduce((a, c) => a + c.spent, 0))}
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
