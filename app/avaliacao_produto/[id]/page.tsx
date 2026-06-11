'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "../../components/navbar";
import { api } from "@/services/api";

interface AvaliacaoProduto {
  id: number;
  nota: number;
  comentario: string;
  createdAt: string;

  user: {
    id: number;
    nome: string;
    username: string;
    fotoPerfilUrl?: string;
  };

  loja: {
    id: number;
    nome: string;
  };


  comentarios: any[];
}

function Estrelas({ nota }: { nota: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-4xl ${
            i < nota ? "text-yellow-300" : "text-gray-500"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function AvaliacaoProduto() {
  const params = useParams();

  const [avaliacao, setAvaliacao] =
    useState<AvaliacaoProduto | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarAvaliacaoLoja() {
      try {
        const response = await api.get(
          `/avaliacoes-produto/${params.id}`
        );

        setAvaliacao(response.data);
      } catch (error) {
        console.error(
          "Erro ao buscar avaliação:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      carregarAvaliacaoLoja();
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F6F3E4]">
        <Navbar />
        <div className="p-10">Carregando...</div>
      </main>
    );
  }

  if (!avaliacao) {
    return (
      <main className="min-h-screen bg-[#F6F3E4]">
        <Navbar />
        <div className="p-10">
          Avaliação de produto não encontrada.
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F6F3E4] min-h-screen">

      <Navbar />

      <div className="relative">

        <div className="w-full bg-black h-[280px]" />

        <div className="absolute top-14 left-14 right-14 flex justify-between">

          <div className="flex items-start gap-6">

            <Link href="/home">
              <Image
                src="/seta-esquerda.svg"
                alt="Voltar"
                width={35}
                height={55}
              />
            </Link>

            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <Image
                src={
                  avaliacao.user.fotoPerfilUrl ||
                  "/user_sem_foto.png"
                }
                alt={avaliacao.user.username}
                width={70}
                height={70}
                className="object-cover w-full h-full"
              />
            </div>

            <div>

              <div className="flex items-center gap-3">

                <h1 className="text-white text-[28px] font-medium">
                  {avaliacao.user.nome}
                </h1>

                <span className="text-gray-400">
                  {new Date(
                    avaliacao.createdAt
                  ).toLocaleDateString("pt-BR")}
                </span>

              </div>

              <p className="text-white text-[20px] mt-8 max-w-[900px] leading-relaxed">
                {avaliacao.comentario}
              </p>

            </div>

          </div>

          <Estrelas nota={avaliacao.nota} />

        </div>

      </div>

      <section className="px-24 pt-14">

        <h2 className="text-3xl font-bold text-black mb-8">
          Comentários ({avaliacao.comentarios.length})
        </h2>


      </section>

    </main>
  );
}
