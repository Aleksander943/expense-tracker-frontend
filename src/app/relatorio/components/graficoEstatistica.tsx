import { Mes } from "./data";

export const Grafico = () => {
   const meses = Mes.slice(-6);


  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 md:px-20 overflow-x-auto">
      <div className="flex items-end justify-between gap-2 sm:gap-4 md:gap-6 border-b border-gray-200 min-w-[360px]">
        {meses.map((mes, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-end gap-1 h-48 w-full justify-center">
              <div
                className="w-3 sm:w-4 bg-emerald-800 rounded-t"
                style={{ height: `100%` }}
              ></div>
              <div
                className="w-3 sm:w-4 bg-rose-700 rounded-t"
                style={{ height: `100%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 mt-2 text-center">
              {mes.abreviacao}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};