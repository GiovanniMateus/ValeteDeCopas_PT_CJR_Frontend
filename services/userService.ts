import { api } from './api';

interface AtualizarPerfilDto {
  nome: string;
  username: string;
  email: string;
}

interface AlterarSenhaDto {
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
}

export async function atualizarPerfil(
  dados: AtualizarPerfilDto
) {
  const token = localStorage.getItem('token');

  return api.put(
    '/users',
    dados,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function alterarSenha(
  dados: AlterarSenhaDto
) {
  const token = localStorage.getItem('token');

  return api.put(
    '/users/alterar-senha',
    dados,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}