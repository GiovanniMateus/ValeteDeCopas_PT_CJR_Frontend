'use client'

import Image from "next/image";
import { User, Pencil } from "lucide-react"; 

interface AvaliacaoProduto {
  id: number;
  nota: number;
  comentario: string;
  user: {
    id: number;
    username: string;
    fotoPerfilUrl: string | null;
  };
}

function Estrelas({ nota }: { nota: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-3xl leading-none ${i < nota ? "text-yellow-300" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

interface CarrosselAvaliacoesProdutoProps {
  avaliacoes: AvaliacaoProduto[];
  loggedUserId?: number | null;
  onEditClick?: (avaliacao: AvaliacaoProduto) => void;
}

export default function CarrosselAvaliacoesProduto({ 
  avaliacoes, 
  loggedUserId, 
  onEditClick 
}: CarrosselAvaliacoesProdutoProps) {
  
  return (
    <section className="px-10 pb-20 mt-4 ml-10 font-spartan">

      <h2 className="text-4xl font-bold text-gray-900 mb-4">Avaliações</h2>

      <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>

        {avaliacoes.length === 0 && (
          <p className="text-gray-400 text-lg">Nenhuma avaliação ainda.</p>
        )}

        {avaliacoes.map((av) => (
          <div key={av.id} className="bg-white rounded-[28px] p-6 shadow-sm min-w-[700px] flex-shrink-0 border border-gray-100">
            <div className="flex items-start gap-5">

              <div className="w-[110px] h-[110px] rounded-full overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center border border-gray-100">
                {av.user?.fotoPerfilUrl ? (
                  <Image
                    src={av.user.fotoPerfilUrl}
                    alt={av.user?.username ?? "Usuário"}
                    width={110}
                    height={110}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User size={50} className="text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  
                  <p className="text-3xl font-medium text-black">
                    {av.user?.username ?? "Usuário"}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Estrelas nota={av.nota} />
                    
                    {/* so disponibiliza a edição se os ids forem iguais */}
                    {loggedUserId === av.user.id && (
                      <button 
                        onClick={() => onEditClick && onEditClick(av)}
                        className="text-black hover:text-gray-500 transition-colors mt-1"
                        title="Editar avaliação"
                      >
                        <Pencil size={22} strokeWidth={2} />
                      </button>
                    )}
                  </div>

                </div>

                <p className="text-xl font-light text-gray-800 mt-2 leading-relaxed">
                  {av.comentario}
                </p>
              </div>

            </div>

            <div className="flex justify-end mt-2">
              <button className="text-purple-600 text-sm font-semibold hover:underline">
                ver mais
              </button>
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}