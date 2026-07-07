"use client";

import { useCallback, useRef, useState } from "react"
import { Home } from "./home"
import { NavBar } from "./navBar"
import { Transaction, type ResumoData } from "./transaction/transaction"

export function Dashboard() {
   const [resumo, setResumo] = useState<ResumoData>({ receita: 0, despesa: 0, saldo: 0 })
   const [activeTab, setActiveTab] = useState<string>("inicio")
   const scrollRef = useRef<HTMLDivElement>(null)
   const extratoRef = useRef<HTMLElement>(null)
   const inicioRef = useRef<HTMLElement>(null)

   const handleResumoChange = useCallback((nextResumo: ResumoData) => {
      setResumo((prevResumo) => {
         const unchanged =
            prevResumo.receita === nextResumo.receita &&
            prevResumo.despesa === nextResumo.despesa &&
            prevResumo.saldo === nextResumo.saldo

         return unchanged ? prevResumo : nextResumo
      })
   }, [])

   const handleNavigate = (tab: string) => {
      setActiveTab(tab)
      if (tab === "inicio") {
         inicioRef.current?.scrollIntoView({ behavior: "smooth" })
      } else if (tab === "extrato") {
         extratoRef.current?.scrollIntoView({ behavior: "smooth" })
      }
   }

   const handleScroll = () => {
      if (!scrollRef.current || !extratoRef.current) return
      const containerRect = scrollRef.current.getBoundingClientRect()
      const extratoRect = extratoRef.current.getBoundingClientRect()
      const offset = extratoRect.top - containerRect.top
      setActiveTab(offset <= containerRect.height * 0.4 ? "extrato" : "inicio")
   }

   return (
      <div className="h-[100svh] w-full overflow-hidden bg-[#edf2ef] sm:h-[100dvh] sm:max-w-[440px] sm:rounded-[42px] sm:shadow-[0_20px_60px_rgba(9,30,20,0.16)] p-2">
         <div className="flex h-full flex-col overflow-hidden">
            <main
               ref={scrollRef}
               onScroll={handleScroll}
               className="min-h-0 flex-1 overflow-y-auto p-1.5 pb-1 scroll-smooth"
            >
               <div className="flex flex-col gap-4">
                  <section ref={inicioRef}>
                     <Home resumo={resumo} />
                  </section>
                  <section ref={extratoRef} className="min-h-[60vh]">
                     <Transaction onResumoChange={handleResumoChange} />
                  </section>
               </div>
            </main>
            <footer className="h-[70px] shrink-0">
               <NavBar activeTab={activeTab} onNavigate={handleNavigate} />
            </footer>
         </div>
      </div>
   )
}