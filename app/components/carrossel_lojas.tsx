'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/services/api";

interface Loja {
  id: number;
  nome: string;
  logoUrl: string;
  categoria: {
    nome: string;
  };
}

interface Props {
  titulo: string;
  categoriasSelecionadas: string[];
}

export default function CarrosselLojas({
  titulo,
  categoriasSelecionadas
}: Props) {

  const [lojas, setLojas] = useState<Loja[]>([]);

  async function buscarLojas() {

    try {

      const response = await api.get("/lojas");

      setLojas(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    buscarLojas();
  }, []);

  const lojasFiltradas =
    categoriasSelecionadas.length === 0
      ? lojas
      : lojas.filter((loja) =>
          categoriasSelecionadas.some(
            (categoria) =>
              categoria.toLowerCase() ===
              loja.categoria?.nome?.toLowerCase()
          )
        );

  return (
    <div>

      <h2 className="text-black text-3xl font-bold mb-8">
        {titulo}
      </h2>

      <div className="overflow-x-auto scrollbar-hide">

        <div className="flex gap-10 min-w-max pb-4">

          {lojasFiltradas.map((loja) => (

            <div
              key={loja.id}
              className="flex flex-col items-center min-w-[180px]"
            >

              <div className="relative w-[170px] h-[170px] rounded-full overflow-hidden bg-white shadow-sm">

                <Image
                  src={loja.logoUrl || "/logo.png"}
                  alt={loja.nome}
                  fill
                  className="object-cover"
                />

              </div>

              <h3 className="text-black text-[20px] mt-4 font-medium text-center">
                {loja.nome}
              </h3>

              <p className="text-[#6C3BFF] text-[18px] font-medium capitalize">
                {loja.categoria?.nome}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}