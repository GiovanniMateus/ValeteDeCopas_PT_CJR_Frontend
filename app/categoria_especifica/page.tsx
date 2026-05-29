'use client'

import Image from "next/image";
import Navbar from "../components/navbar";
import Pesquisa from "../components/pesquisa";
import CarrosselProdutos from "../components/carrossel_produtos";
import { useState } from "react";
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


export default function Home() {
  const [pesquisa, setPesquisa] = useState("");

  return (
    <main className="min-h-screen bg-white">

      <Navbar />

      <section className="w-full bg-black h-[447px] flex items-center justify-between px-10 overflow-hidden">

        <div className="text-white pl-40">
          <h1 className="text-6xl font-bold ">
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
 
        <CarrosselProdutos
          titulo="Melhores avaliados"
          endpoint="/produtos/melhores-avaliados"
        />

        <CarrosselProdutos
          titulo="Mais baratos"
          endpoint="/produtos/mais-baratos"
        />

        <CarrosselProdutos
          titulo="Recém adicionados"
          endpoint="/produtos/recem-adicionados"
        />
      </div>

    </main>
  );
}