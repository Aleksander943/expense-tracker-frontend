"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api";
import { Plus } from "lucide-react";
import { useState } from "react";


type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onCreated?: () => void;
};

export function AdicionarTransaction({ open, onOpenChange, onCreated }: Props) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("receita");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const criar = async () => {
    try {
      await api.post("/transaction", {
        description,
        value: Number(value),
        category,
        date,
        type,
      });

      alert("Transação criada com sucesso!");
      setDescription("");
      setValue("");
      setCategory("");
      onOpenChange(false);
      onCreated?.();
    } catch {
      alert("Erro ao criar transação.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-lg border border-[#ebebeb] bg-white p-0 shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
        <DialogHeader className="border-b border-[#f5f5f3] px-6 pb-1 pt-3">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f4ef]">
            <Plus className="w-5 h-5"/>
          </div>
          <DialogTitle className="text-[17px] font-bold text-[#1a1a18]">Nova transação</DialogTitle>
          <DialogDescription className="text-[13px] text-[#9a9a94]">
            Preencha os dados para registrar sua transação.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup className="flex flex-col gap-4 px-5 py-1">
          <Field>
            <Label className="mb-[6px] block text-[11px] font-semibold uppercase text-[#9a9a94]">Tipo</Label>
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-[#ebebeb] bg-[#f7f7f4] p-1">
              <button
                type="button"
                onClick={() => setType("receita")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-[13px] font-semibold transition-all ${
                  type === "receita" ? "bg-white text-[#2d6a4f] shadow-sm" : "text-[#9a9a94]"
                }`}
              >
                Receita
              </button>
              <button
                type="button"
                onClick={() => setType("despesa")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-[13px] font-semibold transition-all ${
                  type === "despesa" ? "bg-white text-[#e63946] shadow-sm" : "text-[#9a9a94]"
                }`}
              >
                Despesa
              </button>
            </div>
          </Field>

          <Field>
            <Label htmlFor="description" className="mb-[6px] block text-[11px] font-semibold uppercase text-[#9a9a94]">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Salário, Mercado..."
              className="w-full rounded-xl border border-[#ebebeb] py-3 px-4 text-[14px]"
            />
          </Field>

          <Field>
            <Label htmlFor="value" className="mb-[6px] block text-[11px] font-semibold uppercase text-[#9a9a94]">Valor</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0,00"
              className="w-full rounded-xl border border-[#ebebeb] py-3 px-4 text-[14px]"
            />
          </Field>

          <Field>
            <Label htmlFor="category" className="mb-[6px] block text-[11px] font-semibold uppercase text-[#9a9a94]">Categoria</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#ebebeb] bg-white py-3 px-4 text-[14px] outline-none"
            >
              <option value="" disabled>Selecione...</option>
              <option value="trabalho">💼 Trabalho</option>
              <option value="moradia">🏠 Moradia</option>
              <option value="alimentacao">🍽️ Alimentação</option>
              <option value="saude">💊 Saúde</option>
              <option value="lazer">🎬 Lazer</option>
              <option value="transporte">🚗 Transporte</option>
              <option value="investimento">📈 Investimento</option>
            </select>
          </Field>

          <Field>
            <Label htmlFor="date" className="mb-[6px] block text-[11px] font-semibold uppercase text-[#9a9a94]">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-[#ebebeb] py-3 px-4 text-[14px]"
            />
          </Field>
        </FieldGroup>

        <DialogFooter className="flex gap-2 border-t border-[#f5f5f3] px-6 pb-6 pt-4">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border border-[#ebebeb] bg-white text-[#9a9a94] hover:bg-[#f7f7f4]"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={criar}
            disabled={!description || !value || !category}
            className="flex-1 rounded-xl bg-[#2d6a4f] text-white hover:bg-[#235c43] disabled:opacity-50"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}