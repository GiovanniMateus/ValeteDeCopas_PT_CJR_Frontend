'use client'
import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';

export default function RedefinirSenhaPage() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setErro("Link inválido. Solicite a recuperação de senha novamente.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (novaSenha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/redefinir-senha', {
        token,
        novaSenha,
      });

      setSucesso(true);

    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErro(error.response.data?.message || "Token inválido ou expirado.");
      } else {
        setErro("Erro ao conectar com o servidor.");
        console.error("Erro na integração:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2e8] flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6">

        <div className="flex flex-col justify-center items-start">
          <Image
            src="/logo.png"
            alt="Logo Stock.io"
            width={421}
            height={267}
            className="object-contain"
          />


          <div className="mt-10">
            <Image
              src="/personagem.png"
              alt="personagem"
              width={420}
              height={420}
              className="w-[320px] md:w-[420px] h-auto"
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-654 h-200 my-25 bg-[#151515] rounded-[48px] p-10 shadow-2xl">

            {sucesso ? (
              //  Estado de senha alterada com sucesso 
              <div className="text-center">
                <h2 className="text-white text-2xl font-extrabold mb-4">
                  SENHA ALTERADA!
                </h2>

                <p className="text-gray-400 text-sm mb-10 leading-relaxed">
                  Sua senha foi redefinida com sucesso. Agora você já pode entrar
                  com sua nova senha.
                </p>

                <Link
                  href="/login"
                  className="w-full inline-block bg-purple-600 hover:bg-purple-700 transition text-white font-bold py-3 rounded-full"
                >
                  IR PARA O LOGIN
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-white text-2xl font-extrabold text-center mb-4">
                  CRIE UMA NOVA SENHA
                </h2>

                <p className="text-gray-400 text-sm text-center mb-10">
                  Digite e confirme sua nova senha de acesso.
                </p>


                {/* Input Nova Senha */}
                <div className="mb-5 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required
                    disabled={!token}
                    className="w-full rounded-full px-6 py-3 bg-[#f5f2e8] text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/*  Input Confirmar Senha */}
                <div className="mb-2 relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar nova senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                    disabled={!token}
                    className="w-full rounded-full px-6 py-3 bg-[#f5f2e8] text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* msg de erro */}
                {erro && (
                  <p className="text-red-400 text-sm text-center mb-4">{erro}</p>
                )}

                {/* Botão */}
                <button
                  type="submit"
                  disabled={loading || !token}
                  className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-bold py-3 rounded-full disabled:opacity-60 mt-4"
                >
                  {loading ? "SALVANDO..." : "REDEFINIR SENHA"}
                </button>



                {/* Voltar ao login */}
                <p className="text-gray-400 text-center mt-6 text-sm">
                  Lembrou sua senha?{" "}
                  <Link href="/login" className="text-purple-500 font-bold hover:underline">
                    Voltar ao login
                  </Link>
                </p>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}