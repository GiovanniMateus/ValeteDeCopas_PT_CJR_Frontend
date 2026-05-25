'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagens?: {
    urlImagem: string;
  }[];
}

interface CarrosselProdutosProps {
  titulo: string;
  subtitulo?: string;
  endpoint: string;
}

export default function CarrosselProdutos({
  titulo,
  subtitulo,
  endpoint,
}: CarrosselProdutosProps) {

  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function buscarProdutos() {

    try {

      const response = await api.get(endpoint);

      setProdutos(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [endpoint]);

  return (
    <div className="mt-12">

      {/* TÍTULO */}
      <div className="flex items-center gap-3 mb-6">

        <h2 className="text-black text-[44px] font-bold leading-none">
          {titulo}
        </h2>

        {subtitulo && (
          <span className="text-[#6C3BFF] text-[20px] font-semibold mt-2">
            {subtitulo}
          </span>
        )}

      </div>

      {/* CARROSSEL */}
      <div className="flex gap-10 overflow-x-auto pb-4 scrollbar-hide">

        {produtos.map((produto) => (

          <div
            key={produto.id}
            className="min-w-[290px]"
          >

            {/* CARD */}
            <div className="bg-[#F8F8F8] rounded-[40px] w-[290px] h-[420px] p-7 flex flex-col">

              {/* IMAGEM */}
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

              {/* INFO */}
              <div className="mt-auto">

                <h3 className="text-black text-[30px] font-semibold leading-tight">
                  {produto.nome}
                </h3>

                <p className="text-black text-[24px] font-medium mt-1">
                  R${produto.preco.toFixed(2).replace(".", ",")}
                </p>

                <p
                  className={`text-[18px] font-medium mt-2 ${
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

          </div>
        ))}

      </div>

    </div>
  );
}