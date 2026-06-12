'use client'

import Link from "next/link";
import { Star } from "lucide-react";

interface InfoProdutoProps {
  nome: string;
  media: number;
  totalAvaliacoes: number;
  loja: { id: number; nome: string };
  estoque: number;
  preco: number;
  descricao: string;
}

export default function InfoProduto({
  nome,
  media,
  totalAvaliacoes,
  loja,
  estoque,
  preco,
  descricao,
}: InfoProdutoProps) {
  return (
    <div className="flex flex-col gap-3 max-w-[380px]">

      {/* Nome */}
      <h1 className="text-3xl font-bold text-gray-900 leading-tight">
        {nome}
      </h1>

      {/* avaliação, loja , estoque */}
      <div className="flex items-center gap-4 text-sm flex-wrap">

        {/* Estrela , nota , reviews */}
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-800">{(media || 0).toFixed(1)}</span>
          <span className="text-gray-500">| {totalAvaliacoes} reviews</span>
        </div>

        
        <Link
          href={`/loja/${loja.id}`}
          className="text-purple-600 font-medium hover:underline"
        >
          {loja.nome}
        </Link>

        
        <span className="text-[#5C8A00] font-medium">
          {estoque} disponíveis
        </span>

      </div>

      {/* preco */}
      <p className="text-4xl font-bold text-gray-900">
        R${preco.toFixed(2).replace(".", ",")}
      </p>


      <div className="mt-1">
        <h2 className="text-base font-bold text-gray-900 mb-2">Descrição</h2>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {descricao}
        </p>
      </div>

    </div>
  );
}
