'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/services/api';

interface Avaliacao {
  id: number;
  nota: number;
  comentario: string;
  createdAt?: string;

  user: {
    nome: string;
    fotoPerfilUrl?: string;
  };
}

interface ReviewsLojaProps {
  lojaId: number;
}

export default function ReviewsLoja({
  lojaId,
}: ReviewsLojaProps) {

  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [media, setMedia] = useState(0);

  useEffect(() => {
    async function carregarAvaliacoes() {
      try {

        const response = await api.get(
          `/avaliacoes-loja/loja/${lojaId}`
        );

        const dados = response.data ?? [];

        setAvaliacoes(dados);

        if (dados.length > 0) {

          const soma = dados.reduce(
            (acc: number, item: Avaliacao) =>
              acc + item.nota,
            0
          );

          setMedia(
            Number(
              (soma / dados.length).toFixed(2)
            )
          );
        }

      } catch (error) {
        console.error(error);
      }
    }

    carregarAvaliacoes();
  }, [lojaId]);

  return (
    <section>

      {/* Cabeçalho */}
      <div className="flex flex-col items-center mb-12">

        <h2
          className="
            text-white
            text-5xl
            md:text-6xl
            font-light
            text-center
          "
        >
          Reviews e Comentários
        </h2>

        <h3
          className="
            text-white
            text-7xl
            md:text-8xl
            font-light
            mt-6
          "
        >
          {media.toFixed(2)}
        </h3>

        <div
          className="
            text-yellow-400
            text-5xl
            mt-3
          "
        >
          ★★★★★
        </div>

      </div>

      {/* Botão ver mais */}
      <div className="flex justify-end mb-6">

        <button
          className="
            text-[#8B5CF6]
            text-2xl
            hover:underline
            transition
          "
        >
          ver mais
        </button>

      </div>

      {/* Carrossel */}
      <div
        className="
          flex
          gap-8
          overflow-x-auto
          pb-6
          scrollbar-hide
          scroll-smooth
        "
      >

        {avaliacoes.length === 0 && (

          <div className="text-gray-400 text-xl">
            Nenhum comentário encontrado.
          </div>

        )}

        {avaliacoes.map((avaliacao) => (

          <div
            key={avaliacao.id}
            className="
              min-w-[800px]
              max-w-[800px]
              bg-[#E8E5D8]
              rounded-[40px]
              p-8
              flex
              gap-8
              flex-shrink-0
            "
          >

            {/* Foto */}
            <div
              className="
                w-40
                h-40
                rounded-full
                overflow-hidden
                bg-gray-300
                flex-shrink-0
              "
            >

              <Image
                src={
                  avaliacao.user?.fotoPerfilUrl ||
                  '/user_sem_foto.png'
                }
                alt={avaliacao.user.nome}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />

            </div>

            {/* Conteúdo */}
            <div className="flex-1">

              <div className="flex justify-between items-start">

                <h3
                  className="
                    text-black
                    text-3xl
                    md:text-4xl
                    font-medium
                  "
                >
                  {avaliacao.user.nome}
                </h3>

                <div
                  className="
                    text-yellow-400
                    text-4xl
                    whitespace-nowrap
                  "
                >
                  {'★'.repeat(avaliacao.nota)}
                  {'☆'.repeat(5 - avaliacao.nota)}
                </div>

              </div>

              <p
                className="
                  text-black
                  text-xl
                  leading-relaxed
                  mt-4
                  line-clamp-4
                "
              >
                {avaliacao.comentario}
              </p>

              {avaliacao.comentario?.length > 180 && (

                <div className="flex justify-end mt-4">

                  <button
                    className="
                      text-[#8B5CF6]
                      text-xl
                      hover:underline
                    "
                  >
                    ver mais
                  </button>

                </div>

              )}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}