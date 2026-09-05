import type { Transacao } from "@/app/type/type";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { EditarTransaction } from "../editarTransacao/editar";
import { DeletarTransacao } from "../deletarTransacao/deletar";

export const TransacoesRecentes = ({
  transaction,
}: {
  transaction: Transacao[];
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] =
    useState<Transacao | null>(null);

  return (
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
    </div>
  );
};
