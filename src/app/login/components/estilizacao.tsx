import { ChartLine } from "lucide-react";

export function Estilizacao() {
  return (
    <div className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-gradient-to-br from-[#16302a] via-[#1f4d3a] to-[#2d6a4f] text-[#eff5f1] px-16 py-14">
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
            <b
              className="block font-semibold text-lg"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Controle sua vida financeira
            </b>
          </div>
        </div>
      </div>
  );
}
 