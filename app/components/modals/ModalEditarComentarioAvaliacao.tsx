'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ModalEditarComentarioAvaliacaoProps {
  comentarioId: number;
  conteudo: string;

  onClose: () => void;
  onAtualizar?: () => void;
}

export default function ModalEditarComentarioAvaliacao({
  comentarioId,
  conteudo,
  onClose,
  onAtualizar,
}: ModalEditarComentarioAvaliacaoProps) {

  const [comentario, setComentario] = useState(conteudo);
  const [carregando, setCarregando] = useState(false);


  async function handleSalvar() {

    if (!comentario.trim()) {
      alert('O comentário não pode estar vazio.');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(
        `http://localhost:3001/comentarios/${comentarioId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            comentarioId,
            conteudo: comentario,
          }),
        }
      );


      if (!response.ok) {
        throw new Error('Erro ao editar comentário');
      }


      alert('Comentário atualizado com sucesso!');

      onAtualizar?.();
      onClose();


    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar comentário.');
    } finally {
      setCarregando(false);
    }
  }



  async function handleExcluir() {

    const confirmar = confirm(
      'Tem certeza que deseja excluir este comentário?'
    );


    if (!confirmar) return;


    try {

      const response = await fetch(
        `http://localhost:3001/comentarios/${comentarioId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );


      if (!response.ok) {
        throw new Error('Erro ao excluir comentário');
      }


      alert('Comentário removido com sucesso!');

      onAtualizar?.();
      onClose();


    } catch (error) {

      console.error(error);
      alert('Erro ao excluir comentário.');

    }
  }



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

      <div
        className="
          relative
          w-[1020px]
          h-[850px]
          max-h-[95vh]
          rounded-2xl
          bg-[#ededed]
          p-10
          shadow-xl
          flex
          flex-col
          items-center
        "
      >


        <button
          onClick={onClose}
          className="
            absolute
            top-[22px]
            right-[22px]
            cursor-pointer
            transition
            hover:opacity-70
          "
        >

          <Image
            src="/icone_fechar.png"
            alt="Fechar"
            width={33}
            height={33}
            priority
          />

        </button>



        <textarea

          value={comentario}

          onChange={(e) =>
            setComentario(e.target.value)
          }

          placeholder="Comentário"

          className="
            mt-16
            w-[826px]
            h-[520px]
            rounded-[24px]
            bg-white
            p-8
            resize-none
            outline-none
            text-[18px]
            text-black
            placeholder:text-gray-400
          "

        />



        <button
          type="button"
          onClick={handleExcluir}

          className="
            mt-10
            w-[540px]
            h-[55px]
            rounded-full
            bg-red-600
            text-white
            text-[22px]
            font-medium
            cursor-pointer
            hover:bg-red-700
            transition
          "
        >

          DELETAR

        </button>



        <button

          type="button"

          onClick={handleSalvar}

          disabled={carregando}

          className={`
            mt-8
            w-[540px]
            h-[55px]
            rounded-full
            text-white
            text-[22px]
            font-medium
            transition

            ${
              carregando
              ? 'bg-gray-400 cursor-not-allowed'
              :
              'bg-[#7C3AED] shadow-[0_10px_20px_rgba(124,58,237,0.4)] cursor-pointer'
            }
          `}

        >

          {carregando ? 'Salvando...' : 'Salvar'}

        </button>


      </div>

    </div>
  );
}