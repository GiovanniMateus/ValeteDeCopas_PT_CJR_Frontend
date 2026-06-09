'use client'

import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

interface ModalCriarAvaliacaoLojaProps {
  lojaId: number;
  nomeLoja: string;
  onClose: () => void;
}

export default function ModalCriarAvaliacaoLoja({
  lojaId,
  nomeLoja,
  onClose,
}: ModalCriarAvaliacaoLojaProps) {
  const [nota, setNota] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const handleSubmit = async () => {
    if (!nota) {
      alert('Selecione uma nota.');
      return;
    }

    setCarregando(true);

    try {
      await axios.post(
        'http://localhost:3001/avaliacao-loja', // ✅ rota correta
        {
          lojaId,
          nota,
          comentario,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setMensagemSucesso('Avaliação enviada com sucesso!');
      setCarregando(false);

      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      alert('Erro ao enviar avaliação.');
      setCarregando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-[1020px] h-[850px] max-h-[95vh] overflow-y-auto rounded-2xl bg-[#ededed] p-10 shadow-xl flex flex-col items-center">


        <button
          onClick={onClose}
          className="absolute top-[22px] left-[955px] flex items-center justify-center transition hover:opacity-70 cursor-pointer"
        >
          <Image src="/icone_fechar.png" alt="Fechar" width={33} height={33} priority />
        </button>

     
        <div className="w-full">
          <h2 className="text-[38px] font-light text-black">
            Você está avaliando{' '}
            <span className="font-bold">{nomeLoja}</span>
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
                  fill={ativa ? 'yellow' : 'none'}
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
          placeholder="Avaliação da loja"
          className="mt-10 w-[826px] h-[380px] rounded-[24px] bg-white p-8 resize-none outline-none text-[18px] text-black placeholder:text-gray-400"
        />

    
        <button
          type="button"
          onClick={handleSubmit}
          disabled={carregando}
          className={`mt-10 w-[540px] h-[60px] rounded-full text-white text-[24px] font-medium transition-colors ${
            carregando
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#7C3AED] shadow-[0_10px_20px_rgba(124,58,237,0.4)] cursor-pointer'
          }`}
        >
          {carregando ? 'Enviando...' : 'Avaliar'}
        </button>

        {mensagemSucesso && (
          <div className="mt-6 p-4 bg-green-500 text-white rounded-lg text-center font-bold shadow-lg animate-bounce">
            {mensagemSucesso}
          </div>
        )}

      </div>
    </div>
  );
}