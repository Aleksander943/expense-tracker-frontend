"use client";

import { UseAuth } from "@/hooks/Auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowDownLeft,
  ArrowUpRight,
  LayoutDashboard,
  LineChart,
  LogOut,
  Settings,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import path from "path";

export const NavBar = () => {
  const [sidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const pathname = usePathname();
  const { user } = UseAuth();

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      active: true,
      path: "dashboard",
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
      label: "Relatórios (Em desenvolvimento)",
      path: "",
    },
  ];

  return (
    <aside
      className={`
          fixed lg:relative z-40 lg:z-auto
          flex-shrink-0 flex flex-col h-full lg:h-auto min-h-screen
          bg-gradient-to-b from-[#16302a] via-[#1f4d3a] to-[#2d6a4f]
          text-[#eff5f1] transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${sidebarOpen ? "w-fit min-w-56" : "lg:w-16 w-56"}
        `}
    >
      {/* logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
          <LineChart className="w-4 h-4 text-[#eff5f1]" />
        </div>
        <span
          className={`font-semibold tracking-tight text-sm whitespace-nowrap transition-opacity duration-200 ${
            sidebarOpen
              ? "opacity-100"
              : "lg:opacity-0 lg:w-0 lg:overflow-hidden"
          }`}
        >
          Finly
        </span>
        {/* close on mobile */}
        <button
          className="ml-auto lg:hidden text-white/60 hover:text-white"
          onClick={() => setMobileMenu(false)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* nav */}
      <nav className="flex flex-col gap-1 px-2 py-4 flex-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = pathname === path;

          return (
            <Link
              key={label}
              href={path}
              onClick={() => setMobileMenu(false)}
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

              <span
                className={`whitespace-nowrap transition-opacity duration-200 ${
                  sidebarOpen
                    ? "opacity-100"
                    : "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* user */}
      <div className="px-2 py-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full bg-white/10 hover:bg-white/15 transition-colors">
          <div className="w-7 h-7 rounded-full bg-[#52916d] flex items-center justify-center text-xs font-semibold flex-shrink-0 text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div
            className={`text-left min-w-0 flex-1 transition-opacity duration-200 ${
              sidebarOpen
                ? "opacity-100"
                : "lg:opacity-0 lg:w-0 lg:overflow-hidden"
            }`}
          >
            <p className="text-xs font-medium text-white truncate">
              {user.name.charAt(0).toUpperCase() +
                user.name.slice(1).toLowerCase()}
            </p>
            <p className="text-[10px] text-white/50 truncate">{user.email}</p>
          </div>
        </button>

        <div
          className={`flex mt-2 gap-1 ${sidebarOpen ? "justify-end px-1" : "justify-center"}`}
        >
          <button className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors">
            <Settings className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
