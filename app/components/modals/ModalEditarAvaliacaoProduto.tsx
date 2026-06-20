'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ModalEditarAvaliacaoProdutoProps {
  avaliacaoId: number;
  produtoId: number;
  nomeProduto: string;
  notaInicial: number;
  comentarioInicial: string;
  onClose: () => void;
  onAtualizar?: () => void;
}

export default function ModalEditarAvaliacaoProduto({
  avaliacaoId,
  produtoId,
  nomeProduto,
  notaInicial,
  comentarioInicial,
  onClose,
  onAtualizar,
}: ModalEditarAvaliacaoProdutoProps) {
  const [nota, setNota] = useState(notaInicial);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState(comentarioInicial);
  const [carregando, setCarregando] = useState(false);

  async function handleSalvar() {
    if (!nota) {
      alert('Selecione uma nota.');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(
        `http://localhost:3001/avaliacoes-produto/${avaliacaoId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            produtoId,
            nota,
            comentario,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao atualizar avaliação');
      }

      alert('Avaliação atualizada com sucesso!');

      onAtualizar?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar avaliação.');
    } finally {
      setCarregando(false);
    }
  }

  async function handleExcluir() {
    const confirmar = confirm(
      'Tem certeza que deseja excluir esta avaliação?'
    );

    if (!confirmar) return;

    try {
      const response = await fetch(
        `http://localhost:3001/avaliacoes-produto/${avaliacaoId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao excluir avaliação');
      }

      alert('Avaliação removida com sucesso!');

      onAtualizar?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir avaliação.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">  
      <div className="relative w-[1020px] h-[850px] max-h-[95vh] overflow-y-auto rounded-2xl bg-[#ededed] p-10 shadow-xl flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-[22px] right-[22px] cursor-pointer transition hover:opacity-70"
        >
          <Image
            src="/icone_fechar.png"
            alt="Fechar"
            width={33}
            height={33}
            priority
          />
        </button>

        <div className="w-full">
          <h2 className="text-[38px] font-light text-black">
            Você está avaliando{' '}
            <span className="font-bold">{nomeProduto}</span>
          </h2>
        </div>

        <div className="flex justify-center mt-14 gap-6">
          {Array.from({ length: 5 }).map((_, i) => {
            const ativa = i < (hover || nota);

            return (
              <button
                key={i}
                type="button"
                onClick={() => setNota(i + 1)}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110 cursor-pointer"
              >
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 51 48"
                  fill={ativa ? '#FFD700' : 'none'}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.5 2L31.5 17H47.5L35 26.5L39.5 42L25.5 33L11.5 42L16 26.5L3.5 17H19.5L25.5 2Z"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-xl text-[#7C3AED] h-7">
          {nota > 0 ? `${nota} estrela${nota > 1 ? 's' : ''}` : ''}
        </div>

        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Avaliação do produto"
          className="mt-10 w-[826px] h-[380px] rounded-[24px] bg-white p-8 resize-none outline-none text-[18px] text-black placeholder:text-gray-400"
        />

        <button
          type="button"
          onClick={handleExcluir}
          className="mt-10 w-[540px] h-[40px] rounded-full bg-red-600 text-white text-[20px] font-medium cursor-pointer hover:bg-red-700"
        >
          DELETAR
        </button>

        <button
          type="button"
          onClick={handleSalvar}
          disabled={carregando}
          className={`mt-8 w-[540px] h-[40px] rounded-full text-white text-[20px] font-medium ${
            carregando
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#7C3AED] shadow-[0_10px_20px_rgba(124,58,237,0.4)] cursor-pointer'
          }`}
        >
          {carregando ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}