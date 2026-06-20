'use client'

import Link from "next/link";
import { Star } from "lucide-react";
import Image from "next/image";

interface InfoProdutoProps {
  nome: string;
  media: number;
  totalAvaliacoes: number;
  loja: { id: number; nome: string };
  estoque: number;
  preco: number;
  descricao: string;
  eLogado: boolean;
  onAbrirModalAvaliacao: () => void;
  eDonoDaLoja: boolean; 
  onAbrirModalEdicao: () => void;
  

}

export default function InfoProduto({
  nome,
  media,
  totalAvaliacoes,
  loja,
  estoque,
  preco,
  descricao,
  eLogado,
  onAbrirModalAvaliacao,
  eDonoDaLoja,
  onAbrirModalEdicao,
  

}: InfoProdutoProps) {
  return (
    <div className="flex flex-col w-full max-w-[700px] font-[family:var(--font-league-spartan)]">

        <div className="flex items-center gap-4">
            {/* nome  */}
            <h1 className="text-5xl font-normal text-black leading-tight">
                {nome}
            </h1>

            {/*Botao de avaliaçao e edicao  */}
            <div className="flex items-center gap-2 mt-2">  
            {eDonoDaLoja && (
                    <button
                        onClick={onAbrirModalEdicao}
                        className="transition-transform hover:scale-105 flex-shrink-0 cursor-pointer"
                        title="Editar produto"
                    >
                        <Image 
                            src="/botao_editar.png" 
                            alt="Editar Produto" 
                            width={30} 
                            height={30} 
                        />
                    </button>
                )}
            {eLogado && (
              <button
                  onClick={onAbrirModalAvaliacao}
                  className="w-7 h-7 rounded-full bg-yellow-400 hover:bg-yellow-500 transition flex items-center justify-center flex-shrink-0"
                  title="Avaliar produto"
              >
                <Image 
                    src="/botao_avaliar.png" 
                    alt="Editar Produto" 
                    width={30} 
                    height={30} 
                />
                
            </button>
            )}
            </div>
        </div>

      {/* avaliacao, loja e estoqu*/}
      <div className="flex items-center gap-x-4 gap-y-2 text-lg mt-2 flex-wrap">

        <div className="flex items-center gap-1 whitespace-nowrap">
          <Star size={18} className="fill-yellow-400 text-yellow-400 border-none" />
          <span className="text-black">{(media || 0).toFixed(1)}</span>
          <span className="text-gray-500">| {totalAvaliacoes} reviews</span>
        </div>

        <Link
          href={`/loja/${loja.id}`}
          className="text-[#8B5CF6] hover:underline whitespace-nowrap"
        >
          {loja.nome}
        </Link>

        <span className="text-[#8B5CF6] whitespace-nowrap">
          {estoque} disponíveis
        </span>

      </div>

      {/* preco */}
      <p className="text-5xl font-normal text-black mt-4 tracking-tight">
        R${preco.toFixed(2).replace(".", ",")}
      </p>

      {/* descricao */}
      <div className="mt-8">
        <h2 className="text-2xl font-normal text-black">Descrição</h2>
        
        <div className="w-8 h-[3px] bg-gray-300 mt-1 mb-4 rounded-full"></div>
        
        <p className="text-base text-gray-800 leading-relaxed whitespace-pre-line font-light">
          {descricao}
        </p>
      </div>

    </div>
  );
}