'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

// 
interface AvaliacaoLoja {
  id: number;
  userId: number;
  lojaId: number;
  nota: number;       // integer no DB
  comentario: string; // text no DB
  createdAt: string;
  user: {
    username: string;
    fotoPerfilUrl: string | null;
  };
  loja: {
    nome: string;
  };
}

function Estrelas({ nota }: { nota: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-3xl ${i < nota ? "text-yellow-300" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function AvaliacoesUsuario() {
  const router = useRouter();
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoLoja[]>([]);
  const [loading, setLoading] = useState(true);

  async function buscarAvaliacoes() {
    // fix: a rota chamada estava diferente da rota no back
    try {
      const response = await api.get<AvaliacaoLoja[]>("/avaliacoes-loja");
      setAvaliacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarAvaliacoes();
  }, []);

  return (
    <section className="px-10 pb-20 mt-4 ml-10">

      <h2 className="text-4xl font-bold text-gray-900 mb-4">Avaliações</h2>

      {loading && (
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm min-w-[900px] flex-shrink-0 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-[170px] h-[170px] rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex-1 space-y-3 pt-2">
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {!loading && (
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>

          {avaliacoes.length === 0 && (
            <p className="text-gray-400 text-lg">Nenhuma avaliação ainda.</p>
          )}

          {avaliacoes.map((av) => (
            <div key={av.id} className="bg-white rounded-2xl p-5 shadow-sm min-w-[900px] flex-shrink-0">
              <div className="flex items-start gap-4">

                <div className="w-[170px] h-[170px] rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image
                    src={av.user?.fotoPerfilUrl ?? "/foto_de_perfil.png"}
                    alt={av.user?.username ?? "Usuário"}
                    width={170}
                    height={170}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    {/* username do DB */}
                    <p className="text-2xl font-bold text-gray-900">
                      {av.user?.username ?? "Usuário"}
                    </p>
                    {/* nota do DB (0–5) */}
                    <Estrelas nota={av.nota} />
                  </div>

                  {/* comentario do DB */}
                  <p className="text-2xl text-gray-900 mt-2 mb-1">
                    {av.comentario}
                  </p>
                </div>

              </div>

              <div className="flex justify-end mt-4">
                <button
                onClick={() => router.push(`/avaliacao_loja/${av.id}`)}
                className="text-purple-600 text-sm font-semibold hover:underline"
                >
                ver mais
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

    </section>
  );
}