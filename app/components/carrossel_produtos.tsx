'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import ProdutoCard from "./card_produto"; 

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

    setProdutos(Array.isArray(response.data) ? response.data : response.data.content ?? response.data);

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
            <ProdutoCard produto={produto} /> 

          </div>
        ))}

      </div>

    </div>
  );
}