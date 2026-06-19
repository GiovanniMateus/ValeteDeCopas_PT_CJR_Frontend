'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Pencil, Plus } from 'lucide-react';

import Navbar from '@/app/components/navbar';
import CarrosselProdutos from '@/app/components/carrossel_produtos';

import { api } from '@/services/api';
import ReviewsLoja from '@/app/components/carrossel_comentarios_loja';
import ProdutosLojaPaginados from '@/app/components/produtos_loja_paginados';
import { resolveImageUrl } from '@/app/lib/resolveImageUrl';

import ModalEditarLoja from '@/app/components/modals/ModalEditarLoja';
import ModalCriarProduto from '@/app/components/modals/ModalCriarProduto';

interface Loja {
  id: number;
  nome: string;
  descricao: string;
  logoUrl?: string;
  bannerUrl?: string;
  stickerUrl?: string;
  userId: number; 
}

export default function LojaPage() {
  const params = useParams();

  const [loja, setLoja] = useState<Loja | null>(null);
  const [loading, setLoading] = useState(true);

  const [mediaNota, setMediaNota] = useState(0);
  const [quantidadeAvaliacoes, setQuantidadeAvaliacoes] = useState(0);

  const [userId, setUserId] = useState<number | null>(null);

  const [modalEditarLojaAberto, setModalEditarLojaAberto] = useState(false);
  const [modalCriarProdutoAberto, setModalCriarProdutoAberto] = useState(false);

  // lê o usuário logado do localStorage 
  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) {
      try {
        setUserId(JSON.parse(u).id);
      } catch {
        /* vai ignora erro de parse */
      }
    }
  }, []);

  async function carregarLoja() {
    try {
      const response = await api.get(`/lojas/${params.id}`);

      setLoja(response.data);

      const avaliacoesResponse = await api.get(
        `/avaliacoes-loja/loja/${params.id}`
      );

      const avaliacoes = avaliacoesResponse.data;

      if (avaliacoes.length > 0) {

        const soma = avaliacoes.reduce(
          (acc: number, avaliacao: any) =>
            acc + avaliacao.nota,
          0
        );

        setMediaNota(
          soma / avaliacoes.length
        );

        setQuantidadeAvaliacoes(
          avaliacoes.length
        );
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarLoja();
  }, [params.id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!loja) {
    return <div>Loja não encontrada</div>;
  }

  function renderEstrelas(nota: number) {

    const estrelasCheias =
      Math.round(nota);

    return (
      "★".repeat(estrelasCheias) +
      "☆".repeat(5 - estrelasCheias)
    );
  }

  // true se o usuário logado é o dono desta loja
  const eDonoLoja = !!userId && loja.userId === userId;

  return (
    <main className="min-h-screen bg-[#F6F3E4]">

      <Navbar />

      {/* Banner */}
      <section className="relative h-[450px]">

        {loja.bannerUrl ? (
          <Image
            src={resolveImageUrl(loja.bannerUrl)}
            alt={loja.nome}
            fill
            className="object-cover"
          />
         ) : 
         ( // coloquei um fundo roxo como padrão para caso não exista banner
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-purple-900" />
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">

          <h1 className="text-6xl font-bold">
            {loja.nome}
          </h1>

          <p className="text-xl mt-3">
            {loja.descricao}
          </p>

          <div className="mt-4 text-yellow-400 text-3xl">
            <span className="text-yellow-400 text-3xl">
              {renderEstrelas(mediaNota)}
            </span>

            <span className="text-white text-sm mt-1">
              {mediaNota.toFixed(1)}
              {" "}
              ({quantidadeAvaliacoes} avaliações)
            </span>
          </div>

        </div>

        {/* botoes editar e adicionar produto*/}
        {eDonoLoja && (
          <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
            <button
              onClick={() => setModalEditarLojaAberto(true)}
              className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 transition flex items-center justify-center shadow-lg"
              title="Editar loja"
            >
              <Pencil size={20} className="text-white" />
            </button>

            <button
              onClick={() => setModalCriarProdutoAberto(true)}
              className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 transition flex items-center justify-center shadow-lg"
              title="Adicionar produto"
            >
              <Plus size={22} className="text-white" />
            </button>
          </div>
        )}

        {/* Logo */}
        <div className="absolute -bottom-20 left-20">

          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white bg-white">

            <Image
              src={resolveImageUrl(loja.stickerUrl) || "/logo.png"}
              alt={`Logo ${loja.nome}`}                
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />

          </div>

        </div>

      </section>

      <section className="pt-28 px-8">

        <CarrosselProdutos
          titulo="Produtos"
          subtitulo="melhor avaliados"
          endpoint={`/produtos?lojaId=${loja.id}`}
        />

        <section className="px-8 py-16">

          <div className="bg-black rounded-3xl px-16 py-14">

            <ReviewsLoja lojaId={loja.id} />

          </div>

        </section>

        <ProdutosLojaPaginados
          lojaId={loja.id}
        />
      </section>

      
      {modalEditarLojaAberto && (
        <ModalEditarLoja
          loja={loja}
          onClose={() => setModalEditarLojaAberto(false)}
          onAtualizar={carregarLoja}
        />
      )}

      {modalCriarProdutoAberto && (
        <ModalCriarProduto
          lojaId={loja.id}
          onClose={() => setModalCriarProdutoAberto(false)}
        />
      )}

    </main>
  );
}