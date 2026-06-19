'use client'

import { useState } from "react";
import Image from "next/image";

import Navbar from "@/app/components/navbar";
import Pesquisa from "@/app/components/pesquisa";
import CarrosselProdutos from "@/app/components/carrossel_produtos";
import CarrosselLojas from "@/app/components/carrossel_lojas";
import FiltroCategoria from "@/app/components/filtro_categoria";
import ListaProdutos from "@/app/components/lista_produtos";
import Link from "next/link";




// Essa pagina agora atua como a home do servidor 



import {
  Shirt,
  Gamepad2,
  House,
  Smartphone,
  Pill,
  ShoppingBasket,
  Sparkles,
  ToyBrick
} from "lucide-react";

const categories = [
  {id:2, name: "Beleza", icon: Sparkles },
  {id:8, name: "Brinquedos", icon: ToyBrick },
  {id:7, name: "Casa", icon: House },
  {id: 4, name: "Eletrônicos", icon: Smartphone },
  {id:5, name: "Farmácia", icon: Pill },
  {id:6, name: "Jogos", icon: Gamepad2 },
  {id:1, name: "Mercado", icon: ShoppingBasket },
  {id:3, name: "Moda", icon: Shirt },
];

export default function Home() {

  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  return (
    <main className="min-h-screen bg-white">

      <Navbar />

      <section className="w-full bg-black h-[447px] flex items-center justify-between px-10 overflow-hidden">

        <div className="text-white max-w-md">
          <h1 className="text-4xl font-bold leading-tight">
            Do CAOS à organização
            <br />
            em alguns cliques
          </h1>
        </div>

        <div className="relative w-[572px] h-[447px]">
          <Image
            src="/personagem_home.png"
            alt="Personagem"
            fill
            className="object-cover object-[50%_0%]"
            sizes="(max-width: 768px) 100vw, 572px"
            priority
          />
        </div>

      </section>

      <div className="bg-[#F6F3E4] min-h-[400px] px-6 py-8">

        <div className="flex justify-end">
          <Pesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />
        </div>

        <h1 className="text-black text-3xl font-bold pt-8">
          Categorias
        </h1>

        <div className="mt-8 overflow-x-auto pb-4">

          <div className="flex gap-4 min-w-max">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <Link
                  key={category.id}
                  href={`/categoria_especifica/${category.id}`}
                  className="flex flex-col items-center min-w-[170px] rounded-3xl bg-white p-4 shadow-sm"
                >
                  <Icon className="w-20 h-20 text-black" />

                  <span className="mt-3 text-center text-base font-semibold text-black">
                    {category.name}
                  </span>

                </Link>
              );
            })}

          </div>

        </div>

        {pesquisa.trim() === "" ? (
          <>
            <CarrosselProdutos
              titulo="Produtos"
              subtitulo="melhores avaliados"
              endpoint="/produtos/melhores-avaliados"
            />

            <CarrosselProdutos
              titulo="Produtos"
              subtitulo="mais baratos"
              endpoint="/produtos/mais-baratos"
            />

            <CarrosselProdutos
              titulo="Produtos"
              subtitulo="recém adicionados"
              endpoint="/produtos/recem-adicionados"
            />
          </>
          ) : (
          <ListaProdutos pesquisa={pesquisa} />
        )}
        
        <div className="flex justify-between items-start mt-16 gap-10">

          <div className="flex-1">
            <CarrosselLojas
              titulo="Lojas"
              categoriasSelecionadas={categoriasSelecionadas}
            />
          </div>

          <FiltroCategoria
            categoriasSelecionadas={categoriasSelecionadas}
            setCategoriasSelecionadas={setCategoriasSelecionadas}
          />

        </div>

      </div>

    </main>
  );
}