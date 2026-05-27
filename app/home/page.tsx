'use client'

import Image from "next/image";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <Navbar />

      <section className="w-full bg-black h-[447px] flex items-center justify-between px-10 overflow-hidden">

        <div className="text-white max-w-md">
          <h1 className="text-4xl font-bold leading-tight">
            Do CAOS à organização<br />em alguns cliques
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

      <section className="bg-white min-h-[400px]" />

    </main>
  );
}