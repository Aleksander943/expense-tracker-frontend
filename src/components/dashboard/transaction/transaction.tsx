"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { AdicionarTransaction } from "./novo/adicionarTransaction";
import { Pencil, Trash } from "lucide-react";
import api from "../../../services/api";
import deletarTransacao from "./delete/deletar";
import { EditarTransaction } from "./editar/editar";

// Mapeamento de ícones e cores por categoria
const categoryMap: Record<string, { icon: string; color: string }> = {
  trabalho: { icon: "💼", color: "bg-[#2d6a4f]/10" },
  moradia: { icon: "🏠", color: "bg-[#9b59b6]/10" },
  alimentacao: { icon: "🍽️", color: "bg-[#e07b39]/10" },
  saude: { icon: "💊", color: "bg-[#e74c3c]/10" },
  lazer: { icon: "🎬", color: "bg-[#e8c84a]/10" },
  transporte: { icon: "🚗", color: "bg-[#1abc9c]/10" },
  investimento: { icon: "📈", color: "bg-[#4a90d9]/10" },
  outros: { icon: "💰", color: "bg-gray-100" },
};

type ApiTransaction = {
  id: number;
  description: string;
  value?: number | string;
  amount?: number | string;
  type: string;
  category?: string;
  createdAt?: string;
  date?: string;
};

export type ResumoData = {
  receita: number;
  despesa: number;
  saldo: number;
};

type TransactionProps = {
  onResumoChange?: (resumo: ResumoData) => void;
};

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

export function Transaction({ onResumoChange }: TransactionProps) {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState<ApiTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [transacaoParaEditar, setTransacaoParaEditar] =
    useState<ApiTransaction | null>(null);
  const [openEditar, setOpenEditar] = useState(false);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions();
  }, [fetchTransactions]);

  const resumo = useMemo(
    () =>
      transactions.reduce(
        (acc, t) => {
          const transactionValue = Number(t.value ?? t.amount ?? 0);
          const transactionType = String(t.type || "").toLowerCase();

          if (transactionType === "receita") {
            acc.receita += transactionValue;
          } else {
            acc.despesa += transactionValue;
          }

          acc.saldo = acc.receita - acc.despesa;
          return acc;
        },
        { receita: 0, despesa: 0, saldo: 0 },
      ),
    [transactions],
  );

  useEffect(() => {
    onResumoChange?.(resumo);
  }, [resumo, onResumoChange]);

  const grouped = useMemo(() => {
    const groups: Record<string, ApiTransaction[]> = {};
    for (const t of transactions) {
      const raw = t.date || t.createdAt;
      const key = raw
        ? new Date(raw).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
          })
        : "Sem data";
      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
    }
    return groups;
  }, [transactions]);

  return (
    <div className="flex min-h-0 flex-col rounded-[24px] bg-white px-4 pb-4 pt-3 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[18px] font-extrabold tracking-tight text-[#13231a]">
          Extrato
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-[6px] rounded-[14px] bg-[#1e6a43] px-4 py-2 text-[12px] font-semibold text-white"
        >
          <span className="text-[16px] leading-none">+</span>
          Novo
        </button>
      </div>

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {months.map((month) => {
          const active = month === "Fev";
          return (
            <button
              key={month}
              type="button"
              className={`min-w-[58px] rounded-full border px-4 py-1.5 text-[12px] font-medium ${
                active
                  ? "border-[#1e6a43] bg-[#1e6a43] text-white"
                  : "border-[#d8e1dc] bg-[#edf2ef] text-[#5f7569]"
              }`}
            >
              {month}
            </button>
          );
        })}
      </div>

      <div className="min-h-0 flex-1">
        {loading ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#d4e6d9] border-t-[#1e5c3a]" />
            <p className="text-[12px] text-[#8aa898]">Carregando...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf7f2] text-2xl">
              💸
            </div>
            <p className="text-[14px] font-semibold text-[#0d1f14]">
              Nenhuma transação ainda
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(grouped).map(([date, items]) => (
              <div key={date}>
                <div className="mb-2 px-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8aa898]">
                    {String(date).toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {items.map((t) => {
                    const isReceita =
                      String(t.type || "").toLowerCase() === "receita";
                    const categoryKey = (t.category || "outros").toLowerCase();
                    const category =
                      categoryMap[categoryKey] || categoryMap.outros;
                    const dateValue = t.date || t.createdAt;
                    const transactionValue = Number(t.value ?? t.amount ?? 0);

                    return (
                      <div
                        key={t.id}
                        className="flex items-center gap-3 rounded-[18px] bg-white px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${category.color} text-[19px]`}
                        >
                          {category.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-semibold text-[#16271e]">
                            {t.description}
                          </p>
                          <p className="mt-[2px] text-[11px] text-[#8aa898]">
                            {categoryKey.charAt(0).toUpperCase() +
                              categoryKey.slice(1)}
                            {dateValue
                              ? ` • ${new Date(dateValue).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}`
                              : ""}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p
                            className={`text-[14px] font-bold tabular-nums tracking-tight ${isReceita ? "text-[#2a8a55]" : "text-[#101d16]"}`}
                          >
                            {isReceita ? "+" : "-"} R${" "}
                            {transactionValue.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </p>
                          <span
                            className={`mt-[4px] inline-block rounded-[8px] px-[8px] py-[2px] text-[10px] font-semibold ${
                              isReceita
                                ? "bg-[#d4f5e4] text-[#1e5c3a]"
                                : "bg-[#fff0e8] text-[#d64747]"
                            }`}
                          >
                            {isReceita ? "Receita" : "Despesa"}
                          </span>
                        </div>
                        <div className=" flex flex-col gap-3.5">
                          <button
                            onClick={() =>
                              deletarTransacao(String(t.id), fetchTransactions)
                            }
                          >
                            <Trash className="w-4 h-4 text-red-600 cursor-pointer" />
                          </button>
                          <button
                            onClick={() => {
                              setTransacaoParaEditar(t);
                              setOpenEditar(true);
                            }}
                          >
                            <Pencil className="w-4 h-4 text-green-600" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {transacaoParaEditar && (
        <EditarTransaction
          key={transacaoParaEditar.id}
          open={openEditar}
          onOpenChange={setOpenEditar}
          onCreated={fetchTransactions}
          transacao={transacaoParaEditar}
        />
      )}

      <AdicionarTransaction
        open={open}
        onOpenChange={setOpen}
        onCreated={fetchTransactions}
      />
    </div>
  );
}
