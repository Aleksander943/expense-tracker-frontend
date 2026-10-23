"use client";

import { NavBar } from "@/components/navbar/navbar";
import { ImagemUpload } from "@/components/upload/imagemUpload";
import { UseAuth } from "@/hooks/Auth";

export const PagePerfil = () => {
  const { user, logout } = UseAuth();

  return (
    <div className="flex min-h-screen bg-[#f3f1ea] font-[Inter,system-ui,sans-serif] text-[#1a1a18]">
      <NavBar />
      <main className="flex flex-1 items-center justify-center px-4 py-10 pb-24 sm:px-8 lg:pb-10">
        <section className="w-full max-w-md rounded-3xl border border-[#e4e0d2] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 text-center">
            <h1
              className="text-2xl font-semibold tracking-tight text-[#1a1a18]"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Meu perfil
            </h1>
            <p className="mt-2 text-sm text-[#7d7d76]">
              Atualize suas informações pessoais
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <ImagemUpload />
          </div>

          <form action="" className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-left text-sm font-medium text-[#45453f]"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={user?.name}
                readOnly
                disabled
                className="w-full rounded-xl border border-[#e4e0d2] bg-[#faf9f5] px-4 py-3 text-sm text-[#1a1a18] outline-none transition-colors focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/10"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-left text-sm font-medium text-[#45453f]"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={user?.email}
                readOnly
                disabled
                className="w-full rounded-xl border border-[#e4e0d2] bg-[#faf9f5] px-4 py-3 text-sm text-[#1a1a18] outline-none transition-colors focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/10"
              />
            </div>
          </form>

          <button
            type="button"
            onClick={logout}
            className="mt-8 w-full rounded-xl border border-[#e8caca] px-4 py-3 text-sm font-semibold  bg-red-700 text-[#fffbfb] transition-colors hover:bg-[#c5271c]"
          >
            Sair
          </button>
        </section>
      </main>
    </div>
  );
};
