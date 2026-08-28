import { Search } from "lucide-react";

interface FiltroProps {
  periodo: string;
  setPeriodo: (valor: "mes" | "3meses" | "ano") => void;
  categoria: string;
  setCategoria: (valor: string) => void;
  busca: string;
  setBusca: (valor: string) => void;
  colorButton: string;
}

export const Filtro = ({
  periodo,
  setPeriodo,
  categoria,
  setCategoria,
  busca,
  setBusca,
  colorButton,
}: FiltroProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1 rounded-xl bg-white p-1 border border-[#e4e0d2]">
        <button
          onClick={() => {
            setPeriodo("mes");
          }}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            periodo === "mes"
              ? colorButton
              : "text-[#9a9a94] hover:bg-[#f0ece0] hover:text-[#1a1a18]"
          }`}
        >
          Este mês
        </button>
        <button
          onClick={() => {
            setPeriodo("3meses");
          }}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            periodo === "3meses"
              ? colorButton
              : "text-[#9a9a94] hover:bg-[#f0ece0] hover:text-[#1a1a18]"
          }`}
        >
          Últimos 3 meses
        </button>
        <button
          onClick={() => {
            setPeriodo("ano");
          }}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            periodo === "ano"
              ? colorButton
              : "text-[#9a9a94] hover:bg-[#f0ece0] hover:text-[#1a1a18]"
          }`}
        >
          Este ano
        </button>
      </div>

      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="bg-white rounded-xl px-3 py-2 text-xs text-[#1a1a18] border border-[#e4e0d2] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
      >
        <option>Todas as categorias</option>
        <option>Salário</option>
        <option>Freelance</option>
        <option>Investimentos</option>
      </select>

      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9a9a94]" />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full bg-white rounded-xl pl-9 pr-3 py-2 text-xs text-[#1a1a18] border border-[#e4e0d2] placeholder:text-[#9a9a94] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
          type="text"
          placeholder="Buscar receita..."
        />
      </div>
    </div>
  );
};
