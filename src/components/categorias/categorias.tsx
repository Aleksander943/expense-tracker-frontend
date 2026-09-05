import { MoreHorizontal } from "lucide-react";

export const Categorias = () => {
  return (
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
  );
};
