import { z } from "zod";

export const schema = z.object({
  type: z.enum(["receita", "despesa"]),

  description: z
    .string()
    .min(1, { message: "A descrição é obrigatória" }),

  value: z.coerce
    .number()
    .positive({ message: "O valor deve ser maior que zero" }),

  createdAt: z
    .string()
    .min(1, { message: "A data é obrigatória" }),
});

export type FormData = z.infer<typeof schema>;