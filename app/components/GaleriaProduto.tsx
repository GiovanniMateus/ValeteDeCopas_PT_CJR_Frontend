'use client'

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ImagemProduto {
  id: number;
  urlImagem: string;
}

interface BadgeLoja {
  nome: string;
  logoUrl: string | null;
}

interface GaleriaProdutoProps {
  imagens: ImagemProduto[];
  loja: BadgeLoja;
}

export default function GaleriaProduto({ imagens, loja }: GaleriaProdutoProps) {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const router = useRouter();

  const urlBase = process.env.NEXT_PUBLIC_API_URL ?? "";

  return (
    <div className="flex items-start gap-4">

      {/* coluna da esquerda */}
      <div className="flex flex-col items-center gap-3 pt-2">

        <button
          onClick={() => router.back()}
          className="text-gray-700 hover:text-black transition mb-1"
          aria-label="Voltar"
        >
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>

        {imagens.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setImagemAtiva(i)}
            className={`
              w-[110px] h-[110px] rounded-2xl overflow-hidden border-2 transition-all
              ${imagemAtiva === i
                ? "border-gray-400 opacity-100"
                : "border-transparent opacity-80 hover:opacity-100"}
            `}
          >
            <Image
              src={`${urlBase}${img.urlImagem}`}
              alt={`Imagem ${i + 1}`}
              width={110}
              height={110}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* imagem centra */}
      <div className="relative w-[490px] h-[490px] rounded-3xl overflow-hidden bg-white flex-shrink-0">

        {imagens[imagemAtiva] && (
          <Image
            src={`${urlBase}${imagens[imagemAtiva].urlImagem}`}
            alt="Imagem principal do produto"
            fill
            className="object-contain"
            priority
          />
        )}

        
        {/* Slogo da loja*/}
        {loja.logoUrl && (
          <div className="absolute top-4 right-4 w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
            <Image
              src={`${urlBase}${loja.logoUrl}`}
              alt={loja.nome}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>
        )}

      </div>
    </div>
  );
}
