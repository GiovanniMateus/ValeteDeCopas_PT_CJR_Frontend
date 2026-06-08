'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { atualizarPerfil } from '@/services/userService';

interface Props {
  open: boolean;
  onClose: () => void;
  onAlterarSenha: () => void;
}

export default function ModalEditarPerfil({
  open,
  onClose,
  onAlterarSenha,
}: Props) {

  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!open) return;

    const userRaw = localStorage.getItem('user');

    if (userRaw) {
      const user = JSON.parse(userRaw);

      setNome(user.nome || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
    }
  }, [open]);

  const handleSalvar = async () => {
    try {
      setSalvando(true);

      const response = await atualizarPerfil({
        nome,
        username,
        email,
      });

      const userAtualizado = response.data;

      localStorage.setItem(
        'user',
        JSON.stringify(userAtualizado)
      );

      alert('Perfil atualizado com sucesso!');
      onClose();

    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar perfil');
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

        <div className="flex flex-col items-center">

          <Image
            src="/perfil.png"
            alt="Perfil"
            width={96}
            height={96}
            className="rounded-full"
          />

          <div className="w-full mt-8">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full h-10 px-4 rounded-full bg-white border border-gray-200 outline-none focus:border-purple-500 placeholder:text-gray-500 placeholder:font-medium text-black"
            />
          </div>

          <div className="w-full mt-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-10 px-4 rounded-full bg-white border border-gray-200 outline-none focus:border-purple-500 placeholder:text-gray-500 placeholder:font-medium text-black"
            />
          </div>

          <div className="w-full mt-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-4 rounded-full bg-white border border-gray-200 outline-none focus:border-purple-500 placeholder:text-gray-500 placeholder:font-medium text-black"
            />
          </div>

          <button
            className="mt-8 border border-red-400 text-red-500 rounded-full h-10 w-full hover:bg-red-50 transition"
          >
            Deletar conta
          </button>

          <button
            onClick={onAlterarSenha}
            className="mt-3 border border-purple-500 text-purple-500 rounded-full h-10 w-full hover:bg-purple-50 transition"
          >
            Alterar senha
          </button>

          <button
            onClick={handleSalvar}
            disabled={salvando}
            className="mt-3 bg-[#6A38F3] text-white rounded-full h-10 w-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>

        </div>

      </div>

    </div>
  );
}