'use client'

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { resolveImageUrl } from "../lib/resolveImageUrl";

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
    <div className="flex items-start gap-10 ml-12">

      {/* coluna lateral */}
      <div className="relative flex flex-col items-center gap-3">

       
        <button
          onClick={() => router.back()}
          className="absolute left-[-70px] top-[30px] -translate-y-1/2 hover:scale-110 transition-transform z-10 cursor-pointer"
          aria-label="Voltar"
        >
          <Image
            src="/seta_produto_voltar.png" 
            alt="Voltar"
            width={18}
            height={26}
            className="object-contain"
          />
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
              src={resolveImageUrl(img.urlImagem)}
              alt={`Imagem ${i + 1}`}
              width={110}
              height={110}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* imagem pprincipal */}
      <div className="relative w-[550px] h-[490px] rounded-3xl overflow-hidden bg-white flex-shrink-0">
        {imagens[imagemAtiva] && (
          <Image
            src={resolveImageUrl(imagens[imagemAtiva].urlImagem)}
            alt="Imagem principal do produto"
            fill
            className="object-contain"
            priority
          />
        )}

        {/*logo loja*/}
        {loja.logoUrl && (
          <div className="absolute top-4 right-4 w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
            <Image
              src={resolveImageUrl(loja.logoUrl, "/logo.png")}
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