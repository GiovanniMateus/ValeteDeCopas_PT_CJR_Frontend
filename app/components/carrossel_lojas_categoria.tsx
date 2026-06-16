'use client'

import Image from "next/image";
import Link from "next/link"; // 1. Importação do Link adicionada aqui
import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface Loja {
  id: number;
  nome: string;
  stickerUrl: string | null;
  categoria: {
    nome: string;
  };
}

interface CarrosselLojasCategoriaProps {
  categoriaId: number;
  titulo?: string;
}

export default function CarrosselLojasCategoria({ categoriaId, titulo = "Principais Lojas" }: CarrosselLojasCategoriaProps) {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loading, setLoading] = useState(true);


  async function buscarLojas() {
    try {
      const response = await api.get<Loja[]>(`/lojas?categoriaId=${categoriaId}`);
      setLojas(response.data);
    } catch (error) {
      console.error("Erro ao buscar lojas da categoria:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarLojas();
  }, [categoriaId]);

  return (
    <div className="bg-black w-full px-10 py-10 mt-6 ">
      <h2 className="text-white text-4xl font-bold mb-10">{titulo}</h2>


      {loading && (
        <div className="flex gap-12 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4 flex-shrink-0 animate-pulse">
              <div className="w-[220px] h-[220px] rounded-full bg-gray-700" />
              <div className="h-5 w-28 bg-gray-700 rounded" />
              <div className="h-4 w-20 bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      )}


      {!loading && (
        <div className="flex gap-12 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
          {lojas.length === 0 && (
            <p className="text-gray-400 text-lg">Nenhuma loja encontrada nessa categoria.</p>
          )}


          {lojas.map((loja) => (
            <Link 
              key={loja.id} 
              href={`/loja/${loja.id}`}
              className="flex flex-col items-center gap-4 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <div className="w-[220px] h-[220px] rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                {loja.stickerUrl ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${loja.stickerUrl}`}
                    alt={`Logo ${loja.nome}`}
                    width={220}
                    height={220}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-black text-5xl font-bold">
                    {loja.nome.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <p className="text-white text-xl font-semibold text-center">
                {loja.nome}
              </p>

              <p className="text-purple-400 text-base font-medium text-center -mt-2">
                {loja.categoria?.nome}
              </p>

            </Link>

          ))}

          
        </div>
      )}
    </div>
  );
}