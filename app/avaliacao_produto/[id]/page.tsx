'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "../../components/navbar";
import { api } from "@/services/api";
import ModalEditarAvaliacaoProduto from "../../components/modals/ModalEditarAvaliacaoProduto";
// import ModalEditarComentario from "../../components/modals/ModalEditarComentario";

interface Comentario {
  id: number;
  conteudo: string;
  createdAt: string;
  user: {
    id: number;
    nome: string;
    username: string;
    fotoPerfilUrl?: string;
    loja?: { nome: string } | null;
  };
}

interface AvaliacaoProduto {
  id: number;
  nota: number;
  comentario: string;
  createdAt: string;
  user: {
    id: number;
    nome: string;
    username: string;
    fotoPerfilUrl?: string;
  };
  produto: {
    id: number;
    nome: string;
  };
  comentarios: Comentario[];
}

function Estrelas({ nota }: { nota: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-4xl ${i < nota ? "text-yellow-300" : "text-gray-500"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function tempoRelativo(dataStr: string): string {
  const agora = new Date();
  const data = new Date(dataStr);
  const diffMs = agora.getTime() - data.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMin / 60);
  const diffD = Math.floor(diffH / 24);

  if (diffMin < 60) return `${diffMin}min`;
  if (diffH < 24) return `${diffH}h`;
  return `${diffD}d`;
}

function getUsuarioLogadoId(): number | null {
  try {
    const raw = localStorage.getItem("userId") ?? localStorage.getItem("user");
    if (!raw) return null;
   
    try {
      const parsed = JSON.parse(raw);
      return parsed?.id ?? parsed ?? null;
    } catch {
      return Number(raw) || null;
    }
  } catch {
    return null;
  }
}

export default function AvaliacaoProdutoPage() {
  const params = useParams();
  const usuarioLogadoId = getUsuarioLogadoId();

  const [avaliacao, setAvaliacao] = useState<AvaliacaoProduto | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modais
  const [modalAvaliacaoAberto, setModalAvaliacaoAberto] = useState(false);
  const [comentarioEditando, setComentarioEditando] = useState<Comentario | null>(null);

  async function carregarDados() {
    try {
      const [avaliacaoRes, comentariosRes] = await Promise.all([
        api.get(`/avaliacoes-produto/${params.id}`),
        api.get(`/comentarios/avaliacao-produto/${params.id}`),
      ]);

      setAvaliacao(avaliacaoRes.data);
      setComentarios(comentariosRes.data ?? []);
    } catch (error) {
      console.error("Erro ao buscar avaliação de produto:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.id) carregarDados();
  }, [params.id]);

  async function carregarComentarios() {
    try {
      const response = await api.get(
        `/comentarios/avaliacao-produto/${params.id}`
      );
      setComentarios(response.data ?? []);
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
    }
  }

  async function enviarComentario() {
    if (!novoComentario.trim() || enviando) return;
    if (!usuarioLogadoId) {
      console.error("Usuário não logado");
      return;
    }

    setEnviando(true);
    try {
      await api.post("/comentarios", {
        userId: usuarioLogadoId,
        avaliacaoProdutoId: Number(params.id),
        conteudo: novoComentario.trim(),
      });

      setNovoComentario("");
      await carregarComentarios();
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    } finally {
      setEnviando(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") enviarComentario();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F6F3E4]">
        <Navbar />
        <div className="p-10">Carregando...</div>
      </main>
    );
  }

  if (!avaliacao) {
    return (
      <main className="min-h-screen bg-[#F6F3E4]">
        <Navbar />
        <div className="p-10">Avaliação não encontrada.</div>
      </main>
    );
  }

  const isDonoAvaliacao = usuarioLogadoId === avaliacao.user.id;

  return (
    <main className="bg-[#F6F3E4] min-h-screen">
      <Navbar />

      <div className="relative">
        <div className="w-full bg-black h-[280px]" />

        <div className="absolute top-14 left-14 right-14 flex justify-between">
          <div className="flex items-start gap-6">
            <Link href="/">
              <Image
                src="/seta-esquerda.svg"
                alt="Voltar"
                width={35}
                height={55}
              />
            </Link>

            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <Image
                src={avaliacao.user.fotoPerfilUrl || "/user_sem_foto.png"}
                alt={avaliacao.user.nome}
                width={70}
                height={70}
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-white text-[28px] font-medium">
                  {avaliacao.user.nome}
                </h1>
                <span className="text-gray-400">
                  {tempoRelativo(avaliacao.createdAt)}
                </span>
              </div>

              <p className="text-white text-[20px] mt-8 max-w-[900px] leading-relaxed">
                {avaliacao.comentario}
              </p>
            </div>

            <div className="flex justify-end">
              {isDonoAvaliacao && (
                <button
                  onClick={() => setModalAvaliacaoAberto(true)}
                  className="text-gray-400 hover:text-white transition-colors ml-1"
                  aria-label="Editar avaliação"
                >
                  {/* Ícone limpo do lápis */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <Estrelas nota={avaliacao.nota} />
        </div>
      </div>

      <section className="px-24 pt-14 pb-10">
        <div className="flex flex-col mb-8">
          {comentarios.length === 0 ? (
            <p className="text-gray-500 text-base">
              Nenhum comentário ainda. Seja o primeiro!
            </p>
          ) : (
            comentarios.map((comentario) => (
              <div key={comentario.id} className="flex gap-4">

                <div className="flex flex-col items-center ml-1">
                  <div className="w-[2px] bg-gray-800 flex-1" />
                </div>

                <div className="w-[48px] h-[48px] rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={comentario.user?.fotoPerfilUrl || "/user_sem_foto.png"}
                    alt={comentario.user?.nome ?? "Usuário"}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex flex-col pb-6 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-black text-base">
                      {comentario.user?.nome}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {tempoRelativo(comentario.createdAt)}
                    </span>

                    {usuarioLogadoId === comentario.user?.id && (
                      <button
                        onClick={() => setComentarioEditando(comentario)}
                        className="text-gray-400 hover:text-gray-700 transition-colors ml-1"
                        aria-label="Editar comentário"
                      >
                       
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" 
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {comentario.user?.loja && (
                    <span className="text-xs text-purple-500 font-medium -mt-0.5 mb-0.5">
                      dona da loja
                    </span>
                  )}

                  <p className="text-gray-800 text-base mt-0.5">
                    {comentario.conteudo}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-sm gap-3">
          <input
            type="text"
            placeholder="Adicionar comentário"
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-500 text-base placeholder:text-gray-400"
          />
          <button
            onClick={enviarComentario}
            disabled={enviando || !novoComentario.trim()}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-40 transition-colors"
            aria-label="Enviar comentário"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </section>

     
      {modalAvaliacaoAberto && (
        <ModalEditarAvaliacaoProduto
          avaliacaoId={avaliacao.id}
          produtoId={avaliacao.produto.id}
          nomeProduto={avaliacao.produto.nome}
          notaInicial={avaliacao.nota}
          comentarioInicial={avaliacao.comentario}
          onClose={() => setModalAvaliacaoAberto(false)}
          onAtualizar={() => {
            setModalAvaliacaoAberto(false);
            carregarDados();
          }}
        />
      )}

      {/* Modal editar comentário
      {comentarioEditando && (
        <ModalEditarComentario
          comentario={comentarioEditando}
          onClose={() => setComentarioEditando(null)}
          onSalvo={() => {
            setComentarioEditando(null);
            carregarComentarios();
          }}
        />
      )} */}
    </main>
  );
}