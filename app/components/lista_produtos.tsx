'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/services/api";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagens?: {
    urlImagem: string;
  }[];
}

interface Props {
  pesquisa: string;
}

export default function ListaProdutos({ pesquisa }: Props) {

  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function buscarProdutos() {

    try {

      const response = await api.get("/produtos", {
        params: {
          search: pesquisa,
        },
      });

      setProdutos(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [pesquisa]);

  return (
    <div className="mt-14">

      <h2 className="text-black text-3xl font-bold mb-8">
        Resultados para "{pesquisa}"
      </h2>

      {produtos.length === 0 ? (

        <p className="text-gray-500 text-lg">
          Nenhum produto encontrado.
        </p>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {produtos.map((produto) => (

            <div
              key={produto.id}
              className="bg-[#F8F8F8] rounded-[40px] p-7"
            >

              <div className="relative w-full h-[220px]">

                <Image
                  src={
                    produto.imagens?.[0]?.urlImagem ||
                    "/produto-placeholder.png"
                  }
                  alt={produto.nome}
                  fill
                  className="object-contain"
                />

              </div>

              <div className="mt-6">

                <h3 className="text-black text-[28px] font-semibold leading-tight">
                  {produto.nome}
                </h3>

                <p className="text-black text-[22px] font-medium mt-2">
                  R$ {produto.preco.toFixed(2).replace(".", ",")}
                </p>

                <p
                  className={`text-[16px] font-medium mt-2 ${
                    produto.estoque > 0
                      ? "text-[#B7E000]"
                      : "text-[#D90429]"
                  }`}
                >
                  {produto.estoque > 0
                    ? "DISPONÍVEL"
                    : "INDISPONÍVEL"}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}