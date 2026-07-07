import type { Metadata } from "next";
import "globals";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Controle financeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
