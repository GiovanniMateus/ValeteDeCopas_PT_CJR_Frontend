import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="bg-[#f5f2e8] h-full flex items-center justify-center min-h-screen">
        <div className="flex w-full max-w-6xl items-center justify-between">
            {/* FORM */}
            <div className="w-1/2 flex items-center justify-center">
            <div className="bg-[#111111] w-654 h-[600px] my-35 mx-10 rounded-2xl flex flex-col items-center p-8 shadow-lg">
                <h1 className="text-white font-bold text-xl mb-8">
                CRIE SUA CONTA
                </h1>

                <div className="w-full space-y-3">
                <input
                    type="text"
                    placeholder="Nome Completo"
                    className="bg-[#F6F3E4] w-full h-9 rounded-full px-4 text-gray-700 outline-none"
                />

                <input
                    type="text"
                    placeholder="Username"
                    className="bg-[#F6F3E4] w-full h-9 rounded-full px-4 text-gray-700 outline-none"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="bg-[#F6F3E4] w-full h-9 rounded-full px-4 text-gray-700 outline-none"
                />

                <div className="relative">
                    <input
                    type="password"
                    placeholder="Senha"
                    className="bg-[#F6F3E4] w-full h-9 rounded-full px-4 text-gray-700 outline-none"
                    />
                    <span className="absolute right-4 top-2 text-gray-400 cursor-pointer">
                    👁
                    </span>
                </div>

                <div className="relative">
                    <input
                    type="password"
                    placeholder="Confirmar Senha"
                    className="bg-[#F6F3E4] w-full h-9 rounded-full px-4 text-gray-700 outline-none"
                    />
                    <span className="absolute right-4 top-2 text-gray-400 cursor-pointer">
                    👁
                    </span>
                </div>
                </div>

                <button className="mt-6 w-full h-10 rounded-full bg-[#5b2dff] text-white font-bold hover:bg-[#6A38F3] transition">
                CRIAR CONTA
                </button>

                <p className="text-gray-300 text-sm mt-6">
                Já possui uma conta?{" "}
                <a href="#" className="text-[#5b2dff] font-semibold hover:underline">
                    Login
                </a>
                </p>
            </div>
            </div>

            {/* DIREITA */}
            <div className="h-screen overflow-hidden flex flex-col items-center justify-center relative">
            <Image
                        src="/logo.png"
                        alt="Logo Stock.io"
                        width={421}
                        height={267}
                        className="object-contain"
                    />

            <Image
                        src="/cadastro.png"
                        alt="cadastro"
                        width={420}
                        height={420}
                        className="w-74 h-auto"
                />
            </div>
        </div>
    </div>
    );
}