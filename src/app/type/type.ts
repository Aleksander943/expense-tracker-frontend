export interface Transacao {
  id: number;
  value: number;
  description: string;
  type: "receita" | "despesa";
  transactionDate: string;
}
