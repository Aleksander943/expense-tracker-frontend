"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import api from "@/services/api";

interface Props {
  open: boolean;
  setOpen?: (open: boolean) => void;
  onOpenChange?: (open: boolean) => void;
  onCreated?: () => void | Promise<void>;
}

interface FormData{
  type: string;
  description: string;
  value: number;
  data: string;
}

export function AdicionarTransaction({ open, setOpen, onOpenChange, onCreated }: Props) {
  const [tipo, setTipo] = useState<"receita" | "despesa">("receita");

  const { register, handleSubmit, setValue } = useForm<FormData>({ defaultValues: { type: "receita", }, });

  const closeDialog = (nextOpen: boolean) => {
    setOpen?.(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const onSubmit = async (data: FormData) => {
    try{
      await api.post("/transaction", data);
      await onCreated?.();
      closeDialog(false);
      if (!onCreated) {
        window.location.reload();
      }
      console.log("Nova transação adicionada");
    }catch (err){
      console.log(`Tivemos um erro na hora de adicionar nova informação ${err}`)
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-xl rounded-lg border border-[#ebebeb] bg-white p-0 shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="border-b border-[#f5f5f3] px-6 pb-4 pt-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f4ef]">
              <Plus className="w-5 h-5 text-[#2d6a4f]" />
            </div>

            <DialogTitle className="text-[17px] font-bold text-[#1a1a18]">
              Nova transação
            </DialogTitle>

            <DialogDescription className="text-[13px] text-[#9a9a94]">
              Preencha os dados para registrar sua transação.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="flex flex-col gap-4 px-6 py-4">
            <Field>
              <Label className="mb-[6px] block text-[11px] font-semibold uppercase text-[#9a9a94]">
                Tipo
              </Label>

              <div className="grid grid-cols-2 gap-1 rounded-xl border border-[#ebebeb] bg-[#f7f7f4] p-1">
                <button
                  type="button"
                  onClick={() => {
                    setTipo("receita");
                    setValue("type", "receita");
                  }}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-lg py-2 text-[13px] font-medium transition-colors",
                    tipo === "receita"
                      ? "border border-[#d8ece3] bg-white text-[#2d6a4f] shadow-sm"
                      : "text-[#9a9a94] hover:text-[#5a5a54]"
                  )}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Receita
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTipo("despesa");
                    setValue("type", "despesa");
                  }}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-lg py-2 text-[13px] font-medium transition-colors",
                    tipo === "despesa"
                      ? "border border-[#f2d9d9] bg-white text-[#b23b3b] shadow-sm"
                      : "text-[#9a9a94] hover:text-[#5a5a54]"
                  )}
                >
                  <ArrowDownRight className="h-3.5 w-3.5" />
                  Despesa
                </button>
              </div>
            </Field>

            <Field>
              <Label
                htmlFor="description"
                className="mb-[6px] block text-[11px] font-semibold uppercase text-[#9a9a94]"
              >
                Descrição
              </Label>

              <Input
                id="description"
                {...register("description")}
                placeholder="Ex: Salário, Mercado..."
                className="w-full rounded-xl border border-[#ebebeb] px-4 py-3 text-[14px]"
              />
            </Field>

            <Field>
              <Label
                htmlFor="value"
                className="mb-[6px] block text-[11px] font-semibold uppercase text-[#9a9a94]"
              >
                Valor
              </Label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#9a9a94]">
                  R$
                </span>

                <Input
                  id="value"
                  {...register("value")}
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  className="w-full rounded-xl border border-[#ebebeb] py-3 pl-10 pr-4 text-[14px]"
                />
              </div>
            </Field>

            <Field>
              <Label
                htmlFor="date"
                className="mb-[6px] block text-[11px] font-semibold uppercase text-[#9a9a94]"
              >
                Data
              </Label>

              <Input
                id="date"
                {...register("data")}
                type="date"
                className="w-full rounded-xl border border-[#ebebeb] px-4 py-3 text-[14px]"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="flex gap-2 border-t border-[#f5f5f3] px-6 pb-6 pt-4">
            <Button
              type="button"
              onClick={() => closeDialog(false)}
              className="flex-1 rounded-xl border border-[#ebebeb] bg-white text-[#9a9a94] hover:bg-[#f7f7f4]"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="flex-1 rounded-xl bg-[#2d6a4f] text-white hover:bg-[#235c43] disabled:opacity-50"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}