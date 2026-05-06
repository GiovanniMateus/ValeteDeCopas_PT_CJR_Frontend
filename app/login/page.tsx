'use client'
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
import Image from "next/image";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
   try {
      
      const response = await api.post('/auth/login', {
        email: email,
        senha: senha 
      });

      
      const { access_token } = response.data;

      
      localStorage.setItem('access_token', access_token);

      alert("Login realizado com sucesso!");
      
      // Redirecionando do usuário após o login:
      router.push('/'); // como ainda não fizemos a home estou direcionando para "/" após o login

    } catch (error: any) {
      
      if (error.response && error.response.status === 401) {
        alert("E-mail ou senha inválidos. Tente novamente.");
      } else {
        alert("Erro ao conectar com o servidor.");
        console.error("Erro na integração:", error);
      }
    }
  };
    
  
  return (
    <div className="min-h-screen bg-[#f5f2e8] flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6">

    
        {/* ESQUERDA */}
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

        {/* DIREITA */}
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit} className="w-654 h-200 my-25 bg-[#151515] rounded-[48px] p-10 shadow-2xl">
            <h2 className="text-white text-2xl font-extrabold text-center mb-10">
              BEM VINDO DE VOLTA!
            </h2>

            {/* Input Email */}
            <div className="mb-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full px-6 py-3 bg-[#f5f2e8] text-gray-700 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Input Senha */}
            <div className="mb-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-full px-6 py-3 bg-[#f5f2e8] text-gray-700 outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button type="button" className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}>
               
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Esqueceu senha */}
            <div className="text-center mb-6">
              <a href="#" className="text-gray-400 text-sm hover:underline">
                Esqueceu sua senha?
              </a>
            </div>

            {/* Botão */}
            <button type="submit"
             className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-bold py-3 rounded-full">
              
              ENTRAR
            </button>

            {/* Cadastro */}
            <p className="text-gray-400 text-center mt-6 text-sm">
              Não possui uma conta?{" "}
              <a href="#" className="text-purple-500 font-bold hover:underline">
                Cadastre-se
              </a>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}