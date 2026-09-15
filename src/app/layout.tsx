import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <Toaster
        position="top-right"
         toastOptions={{
    classNames: {
      toast: "!rounded-2xl",
      success:
        "!bg-[#2d6a4f] !text-white !border-[#2d6a4f]",
      error:
        "!bg-[#DC2626] !text-white !border-[#DC2626]",
      title: "!font-semibold",
      description: "!text-white/80",
    },
  }}
        />
      </body>
    </html>
  );
}
