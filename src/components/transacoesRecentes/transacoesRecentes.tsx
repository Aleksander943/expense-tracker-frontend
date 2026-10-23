import type { Transacao } from "@/app/type/type";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { EditarTransaction } from "../editarTransacao/editar";
import { DeletarTransacao } from "../deletarTransacao/deletar";

interface Props {
  transaction: Transacao[];
  atualizar: () => void | Promise<void>;
}

export const TransacoesRecentes = ({ transaction, atualizar }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] =
    useState<Transacao | null>(null);

  const transacoesPorMes = transaction.reduce(
    (grupos, transacao) => {
      const data = new Date(transacao.transactionDate);

      const mesAno = data.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      });

      if (!grupos[mesAno]) {
        grupos[mesAno] = [];
      }

      grupos[mesAno].push(transacao);

      return grupos;
    },
    {} as Record<string, Transacao[]>,
  );

  return (
    <div className="divide-y divide-gray-100">
      {transaction.length !== 0 ? (
        Object.entries(transacoesPorMes).map(([mesAno, transacoes]) => (
          <div key={mesAno}>
            <h3 className="border-y border-gray-100 bg-gray-50 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {mesAno}
            </h3>

            {transacoes.map((transactions) => (
              <div
                key={transactions.id}
                className="group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-gray-50 sm:px-6"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                      transactions.type === "receita"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {transactions.type === "receita" ? "↑" : "↓"}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium capitalize text-gray-800">
                      {transactions.description}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                      <span className="capitalize">{transactions.type}</span>
                      <span>•</span>
                      <p className="text-xs text-gray-400">
                        {new Date(
                          transactions.transactionDate,
                        ).toLocaleDateString("pt-BR", {
                          timeZone: "UTC",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {transactions.type === "receita" ? (
                    <span className="whitespace-nowrap text-sm font-semibold text-emerald-600 tabular-nums">
                      +{" "}
                      {transactions.value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  ) : (
                    <span className="whitespace-nowrap text-sm font-semibold text-rose-600 tabular-nums">
                      -{" "}
                      {transactions.value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setOpenEditar(true);
                        setTransacaoSelecionada(transactions);
                      }}
                      className="rounded-lg p-1 text-[#64748B] transition-colors hover:bg-[#f0ece0]"
                      aria-label="Editar transação"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => {
                        setOpenDelete(true);
                        setTransacaoSelecionada(transactions);
                      }}
                      className="rounded-lg p-1 text-[#DC2626] transition-colors hover:bg-[#f0ece0]"
                      aria-label="Apagar transação"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
          atualizar={atualizar}
        />
      )}

      <DeletarTransacao
        open={openDelete}
        onOpenChange={setOpenDelete}
        transacao={transacaoSelecionada}
        atualizar={atualizar}
      />
    </div>
  );
};
