export function Apresentacao() {
  return (
    <div className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-gradient-to-br from-[#16302a] via-[#1f4d3a] to-[#2d6a4f] text-[#eff5f1] px-16 py-14">
      <div className="relative z-10 max-w-md">
        <p className="text-xs uppercase tracking-[0.12em] text-[#bfe0cc]/85 mb-3">
          Comece hoje
        </p>
        <h1
          className="text-3xl font-semibold tracking-tight leading-tight mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Organize suas finanças com clareza.
        </h1>
        <p className="text-sm leading-relaxed text-[#d7e6dc]">
          Cadastre-se para acompanhar receitas, despesas e metas em um painel
          prático e objetivo.
        </p>
      </div>
    </div>
  );
}
