import Image from "next/image";

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagens?: {
    urlImagem: string;
  }[];
}

interface ProdutoCardProps {
  produto: Produto;
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {
  return (
    <div className="bg-[#F8F8F8] rounded-[40px] w-[250px] h-[380px] p-7 flex flex-col">

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

        <h3 className="text-black text-[30px] font-semibold leading-tight line-clamp-2 text-ellipsis overflow-hidden">
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
    


  );}