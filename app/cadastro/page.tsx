"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    username: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      await api.post("/users", {
        nome: formData.nome,
        username: formData.username,
        email: formData.email,
        senhaHash: formData.senha,
      });

      alert("Conta criada com sucesso!");
      router.push("/login");

    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erro ao criar conta"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f1f0e4] min-h-screen flex items-start justify-center pt-16 md:pt-24 p-6">    
      <div className="flex w-full max-w-7xl items-start justify-center gap-10 lg:gap-20 flex-col-reverse lg:flex-row">
        
        {/* FORMULÁRIO */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <form
            onSubmit={handleSubmit}
            className="bg-[#1a1a1a] w-full max-w-[500px] rounded-3xl flex flex-col items-center p-10 md:p-12 shadow-2xl"
          >
            <h1 className="text-white font-bold text-2xl md:text-3xl mb-10 tracking-tight text-center">
              CRIE SUA CONTA
            </h1>

            {error && (
              <p className="text-red-500 text-sm mb-4">
                {error}
              </p>
            )}

            <div className="w-full space-y-4">
              <input
                required
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                type="text"
                placeholder="Nome Completo"
                className="bg-[#f0ece2] w-full h-12 rounded-full px-6 text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#7c3aed]"
              />

              <input
                required
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Username"
                className="bg-[#f0ece2] w-full h-12 rounded-full px-6 text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#7c3aed]"
              />

              <input
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="bg-[#f0ece2] w-full h-12 rounded-full px-6 text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#7c3aed]"
              />

              <div className="relative">
                <input
                  required
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  type="password"
                  placeholder="Senha"
                  className="bg-[#f0ece2] w-full h-12 rounded-full px-6 text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
                <span className="absolute right-6 top-3.5 text-gray-500 cursor-pointer">
                  👁
                </span>
              </div>

              <div className="relative">
                <input
                  required
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  type="password"
                  placeholder="Confirmar Senha"
                  className="bg-[#f0ece2] w-full h-12 rounded-full px-6 text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
                <span className="absolute right-6 top-3.5 text-gray-500 cursor-pointer">
                  👁
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full h-12 rounded-full bg-[#7c3aed] text-white font-bold text-lg hover:bg-[#6d28d9] transition-all"
            >
              {loading ? "CRIANDO..." : "CRIAR CONTA"}
            </button>

            <p className="text-gray-400 text-sm mt-6">
              Já possui uma conta?{" "}
              <a
                href="/login"
                className="text-[#7c3aed] font-semibold hover:underline"
              >
                Login
              </a>
            </p>
          </form>
        </div>

        {/* LOGO E IMAGEM */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-center justify-start lg:mt-10">
          <div className="mb-10">
            <Image
              src="/logo.png"
              alt="Logo Stock.io"
              width={320}
              height={120}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex justify-center lg:justify-center w-full">
            <Image
              src="/cadastro.png"
              alt="Ilustração Personagem Stock.io"
              width={450}
              height={450}
              className="w-full max-w-[400px] h-auto object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
}