import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "Controle financeiro",
  description: "Controle financeiro",
  icons: {
    icon: "/chart-line.svg",
  },
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
