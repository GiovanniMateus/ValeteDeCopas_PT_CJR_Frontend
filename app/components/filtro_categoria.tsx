'use client'

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { api } from "@/services/api";

interface Categoria {
  id: number;
  nome: string;
}

interface Props {
  categoriasSelecionadas: string[];
  setCategoriasSelecionadas: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}

export default function FiltroCategoria({
  categoriasSelecionadas,
  setCategoriasSelecionadas
}: Props) {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [open, setOpen] = useState(false);

  async function buscarCategorias() {
    const response = await api.get("/categorias");
    setCategorias(response.data);
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  function toggleCategoria(nome: string) {

    setCategoriasSelecionadas((prev) => {

      const jaExiste = prev.includes(nome);

      if (jaExiste) {
        return prev.filter((item) => item !== nome);
      }

      return [...prev, nome];
    });
  }

  return (
    <div 
        className={`
            w-[467.16px]
            bg-[#F3F3F3]
            px-6
            transition-all
            duration-300
            overflow-hidden
            ${open
            ? "rounded-[30px] py-6"
            : "h-[43.69px] rounded-[87.37px]"}
        `}
    >

        <button
            onClick={() => setOpen(!open)}
            className="w-full h-[43.69px] flex items-center justify-between"
            >
            <h2 className="text-[20px] text-[#6A38F380] font-light leading-none">
              filtros
            </h2>

            {open ? (
                <ChevronUp
                className="text-[#B08CFF] shrink-0"
                size={18}
                strokeWidth={1.8}
                />
            ) : (
                <ChevronDown
                className="text-[#B08CFF] shrink-0"
                size={18}
                strokeWidth={1.8}
                />
            )}
        </button>

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ${open ? "max-h-[500px] mt-6" : "max-h-0"}
        `}
      >

        <div className="mt-6 flex flex-col gap-4">

          {categorias.map((categoria) => (

            <label
              key={categoria.id}
              className="flex items-center gap-3 text-[#6A38F3] font-light cursor-pointer"
            >

              <input
                type="checkbox"
                checked={categoriasSelecionadas.includes(categoria.nome)}
                onChange={(e) =>{
                  if (e.target.checked) {
                    setCategoriasSelecionadas((prev) => [
                      ...prev, 
                      categoria.nome
                    ]);
                  } else {
                    setCategoriasSelecionadas((prev) => 
                      prev.filter((item) => item !== categoria.nome));
                  }
                }}
                className="w-5 h-5 rounded border-[#6A38F3]"
              />

              <span className="text-[18px]">
                {categoria.nome}
              </span>

            </label>

          ))}

        </div>

      </div>

    </div>
  );
}