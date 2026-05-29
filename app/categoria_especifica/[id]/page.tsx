'use client'

import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "../../components/navbar_tela_categoria_especifica";
import Pesquisa from "../../components/pesquisa";
import CarrosselProdutos from "../../components/carrossel_produtos";
import CarrosselLojasCategoria from "../../components/carrossel_lojas_categoria";
import GradePaginada from "@/app/components/grade_paginada";
import { useState } from "react";

export default function CategoriaEspecifica() {

  const params = useParams();
  const categoriaId = Number(params.id);
  const [pesquisa, setPesquisa] = useState('');

  return (
    <main className="min-h-screen bg-white">

      <Navbar />

      <section className="w-full bg-black h-[447px] flex items-center justify-between px-10 overflow-hidden">

        <div className="text-white pl-40 flex flex-col justify-end h-full pb-10">
          <h1 className="text-6xl font-bold">
            O universo da tecnologia<br />em um só lugar
          </h1>
        </div>

        <div className="relative w-[300px] h-[400px] mr-30 mt-20">
          <Image
            src="/personagem_categoria_especifica.png"
            alt="PersonagemCategoriaEspecifica"
            fill
            className="object-cover object-[50%_0%]"
            sizes="(max-width: 400px) 100vw, 572px"
            priority
          />
        </div>

      </section>

      <div className="bg-[#F6F3E4] min-h-[400px] px-6 py-8">

        <div className="flex justify-end">
          <Pesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />
        </div>

       <GradePaginada categoriaId={categoriaId} pesquisa={pesquisa} />        


        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
            <CarrosselLojasCategoria
              categoriaId={categoriaId}
              titulo="Principais Lojas"
            />
        </div>



     

        <CarrosselProdutos
          titulo="Mais populares"
          endpoint={`/produtos/melhores-avaliados?categoriaId=${categoriaId}`}
        />

        <CarrosselProdutos
          titulo="Recém adicionados"
          endpoint={`/produtos/recem-adicionados?categoriaId=${categoriaId}`}
        />

      </div>

    </main>
  );
}