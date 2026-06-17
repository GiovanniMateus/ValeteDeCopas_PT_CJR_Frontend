'use client'
import { useState } from "react";
import Image from "next/image";
import { api } from "@/services/api";
import Link from 'next/link';

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      await api.post('/auth/esqueci-senha', { email });

     
      setEnviado(true);

    } catch (error: any) {
      alert("Erro ao conectar com o servidor");

      console.error("Erro na integração:", error);
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

            {!enviado ? (
              <form onSubmit={handleSubmit}>
                <h2 className="text-white text-2xl font-extrabold text-center mb-4">
                  ESQUECEU SUA SENHA?
                </h2>

                <p className="text-gray-400 text-sm text-center mb-10">
                  Digite seu email e enviaremos um link para você criar uma nova senha.
                </p>

                {/* Input Email */}
                <div className="mb-6">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-full px-6 py-3 bg-[#f5f2e8] text-gray-700 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Botão */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-bold py-3 rounded-full disabled:opacity-60"
                >
                  {loading ? "ENVIANDO..." : "ENVIAR LINK"}
                </button>

                {/* Voltar ao login */}
                <p className="text-gray-400 text-center mt-6 text-sm">
                  Lembrou sua senha?{" "}
                  <Link href="/login" className="text-purple-500 font-bold hover:underline">
                    Voltar ao login
                  </Link>
                </p>
              </form>
            ) : (

              // Estado de email enviado 
              <div className="text-center">
                <h2 className="text-white text-2xl font-extrabold mb-4">
                  EMAIL ENVIADO!
                </h2>

                <p className="text-gray-400 text-sm mb-10 leading-relaxed">
                  Se o email <span className="text-gray-200">{email}</span> estiver cadastrado,
                  você receberá um link para redefinir sua senha em poucos minutos.
                </p>

                <Link
                  href="/login"
                  className="w-full inline-block bg-purple-600 hover:bg-purple-700 transition text-white font-bold py-3 rounded-full"
                >
                  VOLTAR AO LOGIN
                </Link>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}