import api from "@/services/api";
import { Trash2, TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { Transacao } from "@/app/type/type";

interface propsDelete {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transacao: Transacao | null;
}

export const DeletarTransacao = ({
  open,
  onOpenChange,
  transacao,
}: propsDelete) => {
  const deletar = async (id: number | undefined) => {
    if (id === undefined) return;
    try {
      await api.delete(`/transaction/${id}`);
      onOpenChange(false);
      window.location.reload();
    } catch {
      alert("Erro ao deletar");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-sm rounded-xl border-[0.5px] border-[#ebebeb] bg-white p-0 shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
        <DialogHeader className="border-b border-[#f5f5f3] px-4 pb-1 pt-2 items-center">
          <div className="flex items-center justify-center m-5">
            <TriangleAlert className="h-6 w-6 text-[#9a9a94]" />
          </div>
          <DialogTitle className="text-[15px] font-bold text-[#1a1a18]">
            Deletar transação?
          </DialogTitle>
          <DialogDescription className="text-[12px] text-[#9a9a94]">
            Essa ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row border-t border-[#f5f5f3] px-4 py-3">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 border border-[#ebebeb] bg-white text-[#1a1a18] py-2 px-4 rounded-lg hover:bg-[#f5f5f5]"
          >
            Cancelar
          </button>
          <button
            onClick={() => deletar(transacao?.id)}
            className="flex-1 border border-red-500 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Deletar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
