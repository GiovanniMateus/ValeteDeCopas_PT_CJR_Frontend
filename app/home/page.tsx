'use client'

import { useState } from "react";
import Image from "next/image";

import Navbar from "../components/navbar";
import Pesquisa from "../components/pesquisa";
import CarrosselProdutos from "../components/carrossel_produtos";
import CarrosselLojas from "../components/carrossel_lojas";
import FiltroCategoria from "../components/filtro_categoria";

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
  { name: "Beleza", icon: Sparkles },
  { name: "Brinquedos", icon: ToyBrick },
  { name: "Casa", icon: House },
  { name: "Eletrônicos", icon: Smartphone },
  { name: "Farmácia", icon: Pill },
  { name: "Jogos", icon: Gamepad2 },
  { name: "Mercado", icon: ShoppingBasket },
  { name: "Moda", icon: Shirt },
];

export default function Home() {

  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);

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
          <Pesquisa />
        </div>

        <h1 className="text-black text-3xl font-bold pt-8">
          Categorias
        </h1>

        <div className="mt-8 overflow-x-auto pb-4">

          <div className="flex gap-4 min-w-max">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <div
                  key={category.name}
                  className="flex flex-col items-center min-w-[170px] rounded-3xl bg-white p-4 shadow-sm"
                >
                  <Icon className="w-20 h-20 text-black" />

                  <span className="mt-3 text-center text-base font-semibold text-black">
                    {category.name}
                  </span>

                </div>
              );
            })}

          </div>

        </div>

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