'use client'

import Image from "next/image";
import Navbar from "../components/navbar3";
import CarrosselProdutos from "../components/carrossel_produtos";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" bg-[#F6F3E4]">

      <Navbar />


      <div className="relative">


        <div className="w-full bg-black h-[280px]" />


        <div className="absolute bottom-[-115px] flex items-center gap-6 left-30">

          <Link
              href="/home"
              className =""
          >
              <Image
              src="/seta-esquerda.svg" 
              alt="Seta esquerda"
              width={35}
              height={55}
              />


          </Link>
            
          

          <div className="w-[230px] h-[230px] rounded-full overflow-hidden">
            <Image
              src="/foto_de_perfil.png"
              alt="Foto de perfil"
              width={230}
              height={230}
              className="object-cover w-full h-full"
            />
          </div>

        </div>


        <div className="absolute bottom-[-90px] right-40">
          <Link href="/" className="bg-purple-600 text-white px-30 py-3 rounded-full font-semibold hover:bg-purple-700 transition">
            Editar Perfil
          </Link>
        </div>

      </div>

      <section className=" ml-20 px-15 pb-20 pt-[130px]">

        <div className="mt-4">
          <h1 className="text-5xl font-bold text-gray-900">Selena Gomez</h1>
          <p className="text-2xl text-gray-500 mt-1">@ selenagomez</p>
          <p className="text-2xl text-gray-500 flex items-center gap-1 mt-1">
            ✉ selenamariegomez@rare.com
          </p>
        </div>

      </section>
      <div className="ml-18 mb-10">
        <CarrosselProdutos />
      </div>
      


      <section className="px-10 pb-8 mt-10 ml-10">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-4xl font-bold text-gray-900">Lojas</h2>
          <Link href= "/" className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl leading-none hover:bg-purple-700 transition">
            +
          </Link>
        </div>

      
        <div className="bg-white w-[600px] rounded-2xl px-11 py-11 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-5xl text-gray-900">Rare Beauty</h3>
            <p className="text-purple-600 text-4xl font-medium mt-1">beleza</p>
          </div>

          <div className="w-[140px] h-[140px] rounded-full bg-[#f0e8e8] flex flex-col items-center justify-center text-center flex-shrink-0 overflow-hidden">
            <Image
              src="/RareBeauty.png"
              alt="Foto de perfil"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

      </section>


      <section className="px-10 pb-20 mt-4 ml-10">

        <h2 className="text-4xl font-bold text-gray-900 mb-4">Avaliações</h2>


        <div className="bg-white rounded-2xl p-5 shadow-sm w-[900px]">
          <div className="flex items-start gap-4">

            <div className="w-[170px] h-[170px] rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
              <Image
                src="/foto_de_perfil.png"
                alt="Selena Gomez"
                width={230}
                height={230}
                className="object-cover w-full h-full"
              />
            </div>

      
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-2xl font-bold text-gray-900 mb-2 ">Selena Gomez</p>
                <div className="flex gap-0.5 text-xl">
                  <span className="text-3xl text-yellow-300">★</span>
                  <span className="text-3xl text-yellow-300">★</span>
                  <span className="text-3xl text-yellow-300">★</span>
                  <span className="text-3xl text-yellow-300">★</span>
                  <span className="text-3xl text-yellow-300">★</span>
                </div>
              </div>
              <p className="text-2xl text-gray-900 mb-1">
                Não é por nada não, mas essa garota arrasa
              </p>
            </div>

          </div>

          <div className="flex justify-end mt-4">
            <button className="text-purple-600 text-sm font-semibold hover:underline">
              ver mais
            </button>
          </div>
        </div>

      </section>

    </main>
  );
}