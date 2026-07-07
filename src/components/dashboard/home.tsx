import { useEffect, useState } from "react";
import type { ResumoData } from "./transaction/transaction";
import { useRouter } from "next/navigation";

interface HomeProps {
  resumo: ResumoData;
}

const formatAmount = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });



export function Home({ resumo }: HomeProps) {
  const [usuario, setUsuario] = useState<string | null>("");
  const router = useRouter()

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("username");
    setUsuario(nomeSalvo);
  }, []);


  const percent = resumo.receita > 0
    ? Math.max(0, Math.round(((resumo.receita - resumo.despesa) / resumo.receita) * 100))
    : 0;

  const totalMovimentado = resumo.receita + resumo.despesa;
  const receitaPercent = totalMovimentado > 0 ? Math.round((resumo.receita / totalMovimentado) * 100) : 0;
  const despesaPercent = totalMovimentado > 0 ? Math.round((resumo.despesa / totalMovimentado) * 100) : 0;

  const logout = () =>{
    localStorage.removeItem('token');
    router.push("/")
  }

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#1f6b43] via-[#14552f] to-[#0b3f24] px-4 py-4 shadow-lg sm:p-5">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.04]" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/[0.03]" />

      <div className="relative mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#5be093] text-base font-black text-[#10442a] sm:h-10 sm:w-10 sm:rounded-[12px] sm:text-lg">
            {usuario?.charAt(0).toUpperCase() ?? "A"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[clamp(0.95rem,4.8vw,1.5rem)] font-semibold capitalize leading-tight text-white">{usuario ?? "aleksander"}</p>
            <p className="text-[10px] text-[#84d5aa] sm:text-[11px]">Fevereiro de 2025</p>
          </div>
        </div>

        <button className="relative flex h-8 w-19 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.08] text-white/80"
        onClick={logout}
        >
          <p className="font-bold">Sair</p>
        </button>
      </div>

      <div className="relative mb-2.5">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#74d8a6] sm:mb-2 sm:text-[12px]">Saldo disponível</p>
        <div className="mb-2 flex items-end gap-[5px] text-white">
          <span className="mb-[4px] whitespace-nowrap text-[clamp(1.2rem,5vw,1.6rem)] font-bold">R$</span>
          <span className="min-w-0 truncate whitespace-nowrap text-[clamp(1.7rem,8vw,2.6rem)] font-extrabold leading-none tracking-[-1px]">{formatAmount(resumo.saldo)}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-[999px] border border-[#4dd78f]/30 bg-[#1f7b4d]/55 px-2.5 py-0.5 sm:gap-2 sm:px-3 sm:py-1">
          <span className="h-[6px] w-[6px] rounded-full bg-[#58dd98]" />
          <span className="text-[11px] font-medium text-[#85dfb1] sm:text-[12px]">{percent}% do rendimento poupado</span>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-2">
        <div className="min-w-0 rounded-[14px] border border-white/10 bg-white/[0.09] px-2.5 py-2.5 sm:rounded-[18px] sm:p-3">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#2e8d59]/70 text-xs sm:h-7 sm:w-7 sm:rounded-[9px] sm:text-sm">💚</span>
            <span className="text-[11px] font-medium text-[#a6d7bc] sm:text-[12px]">Receitas</span>
          </div>
          <p className="truncate whitespace-nowrap text-[clamp(0.9rem,4.5vw,1.5rem)] font-extrabold leading-none tracking-tight text-white">R$ {formatAmount(resumo.receita)}</p>
          <p className="mt-1 text-[10px] font-semibold text-[#6fe2a8] sm:text-[11px]">{receitaPercent}% da movimentação</p>
        </div>

        <div className="min-w-0 rounded-[14px] border border-white/10 bg-white/[0.09] px-2.5 py-2.5 sm:rounded-[18px] sm:p-3">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#7b7f2b]/60 text-xs sm:h-7 sm:w-7 sm:rounded-[9px] sm:text-sm">🟡</span>
            <span className="text-[11px] font-medium text-[#a6d7bc] sm:text-[12px]">Despesas</span>
          </div>
          <p className="truncate whitespace-nowrap text-[clamp(0.9rem,4.5vw,1.5rem)] font-extrabold leading-none tracking-tight text-white">R$ {formatAmount(resumo.despesa)}</p>
          <p className="mt-1 text-[10px] font-semibold text-[#f0be43] sm:text-[11px]">{despesaPercent}% da movimentação</p>
        </div>
      </div>
    </div>
  );
}
