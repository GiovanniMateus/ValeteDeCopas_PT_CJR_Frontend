'use client'

import Image from "next/image";
import Navbar from "../../components/navbar";
import CarrosselProdutos from "../../components/carrossel_produtos";
import Link from "next/link";
import { useEffect, useState } from 'react';
import ModalCriarProduto from "@/app/components/modals/ModalCriarProduto";
import AvaliacoesUsuario from '../../components/carrossel_avaliacoes';
import LojasUsuario from '../../components/carrossel_lojas_usuario';
import { useRouter, useParams } from 'next/navigation';
import { api } from "@/services/api";


interface Usuario {
  id: number;
  nome: string;
  username: string;
  email: string;
  fotoPerfilUrl: string | null; 
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);  
  const [perfil, setPerfil] = useState<Usuario | null>(null);  
  const router = useRouter();
  const params = useParams();
  const perfilId = Number(params.id); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const userRaw = localStorage.getItem('user');
    if (userRaw) {
      const user = JSON.parse(userRaw);
      setUserId(user.id);
    }

    async function buscarPerfil() {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get<Usuario>(
          `/users/${perfilId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPerfil(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setLoading(false);
      }
    }
    buscarPerfil();
  }, [router, perfilId]);

  if (loading) return <div>Carregando...</div>;

  return (
    <main className="bg-[#F6F3E4]">

      <Navbar />

      <div className="relative">

        <div className="w-full bg-black h-[280px]" />

        <div className="absolute bottom-[-115px] flex items-center gap-6 left-30">
          <Link href="/home">
            <Image
              src="/seta-esquerda.svg"
              alt="Seta esquerda"
              width={35}
              height={55}
            />
          </Link>

          <div className="w-[230px] h-[230px] rounded-full overflow-hidden">
   
            <Image
              src={perfil?.fotoPerfilUrl ?? "/user_sem_foto.png"}
              alt="Foto de perfil"
              width={230}
              height={230}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="absolute bottom-[-90px] right-40">
          <Link
            href="/"
            className="bg-purple-600 text-white px-30 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            Editar Perfil
          </Link>
        </div>

      </div>

      <section className="ml-20 px-15 pb-20 pt-[130px]">
        <div className="mt-4">
          <h1 className="text-5xl font-bold text-gray-900">
            {perfil?.nome ?? "..."}
          </h1>
          <p className="text-2xl text-gray-500 mt-1">
            @ {perfil?.username ?? "..."}
          </p>
          <p className="text-2xl text-gray-500 flex items-center gap-1 mt-1">
            ✉ {perfil?.email ?? "..."}
          </p>
        </div>
      </section>

      
      {perfilId && (
        <div className="ml-10 px-10">
          <CarrosselProdutos
            titulo="Produtos"
            subtitulo=""
            endpoint={`/produtos?userId=${perfilId}`}
          />
        </div>
      )}

      
      <LojasUsuario onAbrirModal={() => setIsModalOpen(true)} />

      <AvaliacoesUsuario />

      {isModalOpen && (
        <ModalCriarProduto onClose={() => setIsModalOpen(false)} />
      )}

    </main>
  );
}