import type { Metadata } from "next";
import "globals";

// eslint-disable-next-line react-refresh/only-export-components
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
