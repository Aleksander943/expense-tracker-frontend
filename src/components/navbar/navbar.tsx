"use client";

import { UseAuth } from "@/hooks/Auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowDownLeft,
  ArrowUpRight,
  LayoutDashboard,
  LineChart,
  LogOut,
  Settings,
} from "lucide-react";
import Cookies from "js-cookie";

export const NavBar = () => {
  const pathname = usePathname();
  const { user } = UseAuth();
  const router = useRouter();

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: ArrowUpRight,
      label: "Receitas",
      path: "/receita",
    },
    {
      icon: ArrowDownLeft,
      label: "Despesas",
      path: "/despesas",
    },
    {
      icon: LineChart,
      label: "Relatórios",
      path: "/relatorio",
    },
  ];

  return (
    <>
      <aside className="hidden min-h-screen w-56 flex-shrink-0 flex-col bg-gradient-to-b from-[#16302a] via-[#1f4d3a] to-[#2d6a4f] text-[#eff5f1] lg:relative lg:flex">
      {/* logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
          <LineChart className="w-4 h-4 text-[#eff5f1]" />
        </div>
        <span className="whitespace-nowrap text-sm font-semibold tracking-tight">
          Finly
        </span>
      </div>

      {/* nav */}
      <nav className="flex flex-col gap-1 px-2 py-4 flex-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = pathname === path;

          return (
            <Link
              key={label}
              href={path}
              className={`
          flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
          transition-colors text-left w-full
          ${
            active
              ? "bg-white/15 text-white"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }
        `}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />

              <span className="whitespace-nowrap">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* user */}
      <div className="px-2 py-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full bg-white/10 hover:bg-white/15 transition-colors">
          <div className="w-7 h-7 rounded-full bg-[#52916d] flex items-center justify-center text-xs font-semibold flex-shrink-0 text-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : ""}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-xs font-medium text-white truncate">
              {user?.name
                ? user.name.charAt(0).toUpperCase() +
                  user.name.slice(1).toLowerCase()
                : ""}
            </p>
            <p className="text-[10px] text-white/50 truncate">{user?.email}</p>
          </div>
        </button>

        <div className="mt-2 flex justify-end gap-1 px-1">
          <button
            aria-label="Configurações"
            className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>

          <button
            aria-label="Sair"
            onClick={() => {
              Cookies.remove("token");
              router.replace("/");
            }}
            className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-[#e4e0d2] bg-white px-2 py-3 lg:hidden">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = pathname === path;

          return (
            <Link
              key={label}
              href={path}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1 text-[10px] font-medium transition-colors ${
                active ? "text-[#2d6a4f]" : "text-[#9a9a94]"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
