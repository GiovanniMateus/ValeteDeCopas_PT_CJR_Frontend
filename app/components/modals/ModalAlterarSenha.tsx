'use client'

import Image from 'next/image';
import { useState } from 'react';
import { alterarSenha } from '@/services/userService';

interface Props {
  open: boolean;
  onClose: () => void;
  onReturn: () => void;
}

export default function ModalAlterarSenha({
  open,
  onClose,
  onReturn,
}: Props) {

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleSalvarSenha = async () => {
    try {

      if (
        !senhaAtual ||
        !novaSenha ||
        !confirmarSenha
      ) {
        alert('Preencha todos os campos');
        return;
      }

      setSalvando(true);

      await alterarSenha({
        senhaAtual,
        novaSenha,
        confirmarSenha,
      });

      alert('Senha alterada com sucesso!');

      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');

      onClose();

    } catch (error: any) {

      console.error(error);

      const mensagem =
        error?.response?.data?.message ||
        'Erro ao alterar senha';

      alert(mensagem);

    } finally {
      setSalvando(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="w-[430px] bg-[#F3F3F3] rounded-[30px] p-8 relative">

        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-2xl hover:scale-110 transition text-black"
        >
          ✕
        </button>

        <button
          onClick={onReturn}
          className="absolute left-6 top-6 text-2xl hover:scale-110 transition text-black"
        >
          ←
        </button>

        <div className="flex flex-col items-center">

          <Image
            src="/uim_key-skeleton.svg"
            alt="Senha"
            width={110}
            height={110}
          />

          <div className="w-full mt-8">

            <input
              type="password"
              placeholder="Senha atual"
              value={senhaAtual}
              onChange={(e) =>
                setSenhaAtual(e.target.value)
              }
              className="w-full h-10 px-4 rounded-full bg-white border border-gray-700 outline-none focus:border-purple-500 placeholder:text-gray-500 placeholder:font-medium text-black"
            />

          </div>

          <div className="w-full mt-3">

            <input
              type="password"
              placeholder="Nova senha"
              value={novaSenha}
              onChange={(e) =>
                setNovaSenha(e.target.value)
              }
              className="w-full h-10 px-4 rounded-full bg-white border border-gray-700 outline-none focus:border-purple-500 placeholder:text-gray-500 placeholder:font-medium text-black"
            />

          </div>

          <div className="w-full mt-3">

            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) =>
                setConfirmarSenha(e.target.value)
              }
              className="w-full h-10 px-4 rounded-full bg-white border border-gray-700 outline-none focus:border-purple-500 placeholder:text-gray-500 placeholder:font-medium text-black"
            />

          </div>

          <button
            onClick={handleSalvarSenha}
            disabled={salvando}
            className="mt-10 bg-[#6A38F3] text-white rounded-full h-10 w-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {salvando
              ? 'Salvando...'
              : 'Salvar Senha'}
          </button>

        </div>

      </div>

    </div>
  );
}