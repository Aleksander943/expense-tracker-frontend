import { NavBar } from "@/components/navbar/navbar";
import {
  Bell,
  Menu,
  MoreHorizontal,
  Plus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export const Receita = () => {
  return (
    <div className="min-h-screen bg-[#f3f1ea] flex font-[Inter,system-ui,sans-serif] text-[#1a1a18]">
      {false && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" />}
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
                Receitas
              </h1>
              <p>Acompanhe todas as suas entradas financeiras</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-1 bg-gradient-to-br from-[#1f4d3a] to-[#2d6a4f] rounded-2xl p-5 text-[#eff5f1] flex flex-col justify-between min-h-[110px]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 uppercase tracking-widest">
                  Total recebido
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
                  {(100).toLocaleString("pt-BR", {
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
                  Média mensal baseado nas receitas
                  {/* {(100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })} */}
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
                  O maior valor recebido
                  {/* {(100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })} */}
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
                  Quantidade de inserção
                  {/* {(100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })} */}
                </p>
                <p className="text-[11px] text-[#9a9a94] mt-1">Este mês</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button className="bg-white rounded-xl p-1 border border-[#e4e0d2]">
              <p>Este mês</p>
            </button>
            <button className="bg-white rounded-xl p-1 mx-5 border border-[#e4e0d2] mx-4 ">
              Útimos 3 meses
            </button>
            <button className="bg-white rounded-xl p-1 border border-[#e4e0d2] mx-4">
              Este ano
            </button>
            <select
              className="bg-white rounded-xl p-1 border mx-5 border-[#e4e0d2] mx-4"
            >
              {" "}
              <option>Todas as categorias</option>
              <option>Salário</option>
              <option>Freelance</option>
              <option>Investimentos</option>
            </select>
               <input className="bg-white rounded-xl p-1 flex-1 border border-[#e4e0d2]" type="text" placeholder="Buscar receita..." />
          </div>

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
              </div>

              
                <div
                  
                  className="group flex items-center justify-between py-3 px-4 border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      // className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                      //   transactions.type === "receita"
                      //   ? "bg-emerald-50 text-emerald-600"
                      //   : "bg-rose-50 text-rose-600"
                      // }`}
                      >
                      {/* {transactions.type === "receita" ? "↑" : "↓"} */}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-800 capitalize">
                        {/* {transactions.description} */}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {/* {transactions.type} */}
                      </p>
                    </div>
                  </div>

                  {/* {transactions.type === "receita" ? (
                    <span className="text-sm font-semibold text-emerald-600 tabular-nums">
                      + R$ {transactions.value.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-rose-600 tabular-nums">
                      - R$ {transactions.value.toFixed(2)}
                    </span>
                  )}
                </div>
              ))} */}
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
              <div className="flex justify-center py-10">
                <p>Em Desenvolvimento</p>
              </div>
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

          {/* ── Bottom nav — mobile ─────────────────────── */}
          {/* <nav className="lg:hidden flex items-center justify-around border-t border-[#e4e0d2] bg-white px-2 py-3 sticky bottom-0 z-20">
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
          </nav> */}
        </div>
      </main>
    </div>
  );
};
