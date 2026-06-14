'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import Navbar from "@/app/components/navbar";
import GaleriaProduto from "@/app/components/GaleriaProduto";
import InfoProduto from "@/app/components/InfoProduto";
import ModalCriarAvaliacaoProduto from "@/app/components/modals/ModalCriarAvaliacaoProduto";
import CarrosselAvaliacoesProduto from "@/app/components/carrosel_avaliacoes_produto";
import ModalEditarAvaliacaoProduto from "@/app/components/modals/ModalEditarAvaliacaoProduto";

interface ImagemProduto {
  id: number;
  urlImagem: string;
}

interface AvaliacaoProduto {
  id: number;
  nota: number;
  comentario: string;
  user: {
    id: number;
    username: string;
    fotoPerfilUrl: string | null;
  };
}

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagens: ImagemProduto[];
  loja: {
    id: number;
    nome: string;
    logoUrl: string;
    userId: number;
  };
  avaliacoes: AvaliacaoProduto[];
  mediaAvaliacoes: number;
}


export default function ProdutoEspecifico() {
  const params = useParams();
  const produtoId = Number(params.id);

   const [userId, setUserId] = useState<number | null>(null);

  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);

  const [modalAvaliarAberto, setModalAvaliarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [avaliacaoEditando, setAvaliacaoEditando] = useState<AvaliacaoProduto | null>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      try { setUserId(JSON.parse(u).id); } catch { /* ignora  */ }
    }
  }, []);

  async function buscar() {
      try {
        const res = await api.get<Produto>(`/produtos/${produtoId}`);
        setProduto(res.data);
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    if (produtoId) buscar();
  }, [produtoId]);

  const eLogado = !!userId;


  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F2E3]">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  if (!produto) {
    return (
      <main className="min-h-screen bg-[#F5F2E3]">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 text-lg">Produto não encontrado.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F2E3]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-15">

        
        <div className="flex items-start gap-12">

          <GaleriaProduto
            imagens={produto.imagens}
            loja={{ nome: produto.loja.nome, logoUrl: produto.loja.logoUrl }}
          />

          <InfoProduto
            nome={produto.nome}
            media={produto.mediaAvaliacoes}
            totalAvaliacoes={produto.avaliacoes?.length ?? 0}
            loja={{ id: produto.loja.id, nome: produto.loja.nome }}
            estoque={produto.estoque}
            preco={produto.preco}
            descricao={produto.descricao}
            eLogado={eLogado}
            onAbrirModalAvaliacao={() => setModalAvaliarAberto(true)}
          />

        </div>

        {/* avaliacoes
        */}
        <CarrosselAvaliacoesProduto 
          avaliacoes={produto.avaliacoes} 
          
          loggedUserId={userId} 
          
          onEditClick={(avaliacao) => {
            
            setAvaliacaoEditando(avaliacao); 
            setModalEditarAberto(true);             
              }}
        />



      </div>

        {modalAvaliarAberto && (
          <ModalCriarAvaliacaoProduto 
          
            produtoId={produtoId} 
            nomeProduto={produto.nome}
            userId={userId!}
            onClose={() => setModalAvaliarAberto(false)} 
            onAtualizar={() => buscar()}
            
          />
        )}

        {modalEditarAberto && avaliacaoEditando && (
          <ModalEditarAvaliacaoProduto
            avaliacaoId={avaliacaoEditando.id}
            produtoId={produtoId}
            nomeProduto={produto.nome}
            notaInicial={avaliacaoEditando.nota}
            comentarioInicial={avaliacaoEditando.comentario}
            onClose={() => {
              setModalEditarAberto(false);
              setAvaliacaoEditando(null); 
            }}
            onAtualizar={() => buscar()}

      
          />
        )}

     </main>
  );
}
