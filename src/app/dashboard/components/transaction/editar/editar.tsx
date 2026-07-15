"use client";

import { Button } from "@/components/ui/button";
import { Dialog,DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";




type PropsEditar = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onCreated: () => void;
  transacao: {
    id: number;
    description: string;
    value?: number | string;
    type: string;
    category?: string;
    date?: string;
  }
}

export function EditarTransaction({ open, onOpenChange, onCreated, transacao }: PropsEditar) {
  const [description, setDescription] = useState(transacao.description)
  const [value, setValue] = useState(String(transacao.value ?? ""))
  const [category, setCategory] = useState(transacao.category ?? "")
  const [type, setType] = useState(transacao.type)
  const [date, setDate] = useState(transacao.date ?? new Date().toISOString().split("T")[0])

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen)
  }

  const edit = async (id: string) => {
    try {
      await api.put(`/transaction/${id}`, { description, value: Number(value), category, type, date });
      alert("Editado com sucesso");
      onCreated();
      onOpenChange(false);
    } catch (error) {
      console.error("ERRO:", error);
      alert("Erro ao editar");
    }
  };


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[90vw] sm:max-w-xs rounded-lg border border-[#ebebeb] bg-white p-0 shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
        <DialogHeader className="border-b border-[#f5f5f3] px-4 pb-1 pt-2">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8f4ef]">
            <Plus className="w-4 h-4"/>
          </div>
          <DialogTitle className="text-[15px] font-bold text-[#1a1a18]">Editar transação</DialogTitle>
          <DialogDescription className="text-[12px] text-[#9a9a94]">
            Preencha os dados para editar sua transação.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup className="flex flex-col gap-2.5 px-4 py-1">
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
              className="w-full rounded-xl border border-[#ebebeb] py-2 px-3 text-[13px]"
            />
          </Field>

          <Field>
            <Label htmlFor="value" className="mb-[4px] block text-[11px] font-semibold uppercase text-[#9a9a94]">Valor</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0,00"
              className="w-full rounded-xl border border-[#ebebeb] py-2 px-3 text-[13px]"
            />
          </Field>

          <Field>
            <Label htmlFor="category" className="mb-[4px] block text-[11px] font-semibold uppercase text-[#9a9a94]">Categoria</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#ebebeb] bg-white py-2 px-3 text-[13px] outline-none"
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
            <Label htmlFor="date" className="mb-[4px] block text-[11px] font-semibold uppercase text-[#9a9a94]">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-[#ebebeb] py-2 px-3 text-[13px]"
            />
          </Field>
        </FieldGroup>

        <DialogFooter className="flex gap-2 border-t border-[#f5f5f3] px-4 pb-4 pt-3">
          <Button
            type="button"
            onClick={() => handleOpenChange(false)}
            className="flex-1 rounded-xl border border-[#ebebeb] bg-white text-[#9a9a94] hover:bg-[#f7f7f4]"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!description || !value || !category}
            className="flex-1 rounded-xl bg-[#2d6a4f] text-white hover:bg-[#235c43] disabled:opacity-50"
            onClick={() => edit(String(transacao.id))}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}