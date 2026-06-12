'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Libertinus_Keyboard } from "next/font/google";
import { Link } from "lucide-react";

interface Loja {
  id: number;
  nome: string;
  logoUrl: string | null;
  categoria: {
    nome: string;
  };
}

interface LojasUsuarioProps {
  onAbrirModal: () => void;
}

export default function LojasUsuario({ onAbrirModal }: LojasUsuarioProps) {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loading, setLoading] = useState(true);

  async function buscarLojas() {
    try {
      const userRaw = localStorage.getItem("user");
      if (!userRaw) return;

      const user = JSON.parse(userRaw);
      const userId = user.id;

      const response = await api.get<Loja[]>(`/lojas?userId=${userId}`);
      setLojas(response.data);
    } catch (error) {
      console.error("Erro ao buscar lojas:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarLojas();
  }, []);

  return (
    <section className="px-10 pb-8 mt-10 ml-10">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl font-bold text-gray-900">Lojas</h2>
        <button
          onClick={onAbrirModal}
          className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl leading-none hover:bg-purple-700 transition cursor-pointer"
        >
          +
        </button>
      </div>

      {/* skeleton */}
      {loading && (
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white min-w-[600px] rounded-2xl px-11 py-11 flex items-center justify-between shadow-sm animate-pulse flex-shrink-0">
              <div className="space-y-3">
                <div className="h-8 w-48 bg-gray-200 rounded" />
                <div className="h-6 w-24 bg-gray-100 rounded" />
              </div>
              <div className="w-[140px] h-[140px] rounded-full bg-gray-200" />
            </div>
          ))}
        </div>
      )}


      {!loading && (
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>

          {lojas.length === 0 && (
            <p className="text-gray-400 text-lg">Você ainda não tem lojas cadastradas.</p>
          )}

          {lojas.map((loja) => (
            <Link
            key={loja.id}
            href={`/loja/${loja.id}`}
            className="bg-white min-w-[600px] flex-shrink-0 rounded-2xl px-11 py-11 flex items-center justify-between shadow-sm">
            <div
              className="bg-white min-w-[600px] flex-shrink-0 rounded-2xl px-11 py-11 flex items-center justify-between shadow-sm"
            >
              <div>
                <h3 className="text-5xl text-gray-900">{loja.nome}</h3>
                <p className="text-purple-600 text-4xl font-medium mt-1">
                  {loja.categoria.nome}
                </p>
              </div>

              <div className="w-[140px] h-[140px] rounded-full bg-[#f0e8e8] flex-shrink-0 overflow-hidden">
                {loja.logoUrl && (
                  <Image
                    src={loja.logoUrl}
                    alt={`Logo ${loja.nome}`}
                    width={140}
                    height={140}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            </div>
            </Link>
          ))}

        </div>
      )}

    </section>
  );
}