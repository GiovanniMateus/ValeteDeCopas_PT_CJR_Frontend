'use client'

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import ProdutoCard, { Produto } from "./card_produto";
import Image from "next/image"; 
interface GradePaginadaProps {
  categoriaId: number;
}

const ORDENACOES = ["Relevância", "Menor preço", "Maior preço"];

interface Subcategoria {
  id: number;
  nome: string;
  categoriaId: number;
}

export default function GradePaginada({ categoriaId }: GradePaginadaProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [listaSubcategorias, setListaSubcategorias] = useState<Subcategoria[]>([]);
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<number | null>(null);
  const [isOrdenacaoMenuOpen, setIsOrdenacaoMenuOpen] = useState(false);
  const [ordenacao, setOrdenacao] = useState("Relevância");

  const ITENS_POR_PAGINA = 15;

  useEffect(() => {
    async function buscarSubcategorias() {
      try {
        const response = await api.get(`/subcategorias`);

        const dadosPuros = Array.isArray(response.data) 
          ? response.data 
          : response.data.content || [];

        const subsFiltradas = dadosPuros.filter(
          (sub: Subcategoria) => Number(sub.categoriaId) === Number(categoriaId)
        );
        
        

        setListaSubcategorias(subsFiltradas);
      } catch (error) {
        console.error(" Erro ao buscar subcategorias:", error);
      }
    }
    
    if (categoriaId) buscarSubcategorias();
  }, [categoriaId]);



  async function buscarProdutos(pagina: number) {
    try {
      const response = await api.get(`/produtos`, {
        params: {
          categoriaId,
          subcategoriaId: subcategoriaSelecionada, 
          ordenacao: ordenacao,
          page: pagina, 
          size: ITENS_POR_PAGINA,
        },
      });
      setProdutos(response.data.content || []);
      setTotalPaginas(response.data.totalPages || 1);
    } catch (error) {
      console.error("Erro ao buscar produtos para a grade:", error);
    }
  }

  useEffect(() => {
    if (categoriaId && !isNaN(categoriaId)) {
      buscarProdutos(paginaAtual);
    }
  }, [categoriaId, paginaAtual,subcategoriaSelecionada, ordenacao]);


  useEffect(() => {
    setPaginaAtual(1);
  }, [subcategoriaSelecionada, ordenacao]);


  function handlePagina(pagina: number) {
    if (pagina < 1 || pagina > totalPaginas) return;
    setPaginaAtual(pagina);
    
  }



  return (
    <div className="flex flex-col w-fit mx-auto mt-12 mb-20 min-h-[800px] " style={{ overflowAnchor: 'none' }}>
      
        {/*Filtros */}
        <div className="flex items-center justify-between w-full mb-10 ">

        {/* subcategorias*/}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {listaSubcategorias.map((sub) => (
                <button
                key={sub.id}
                onClick={() => setSubcategoriaSelecionada(subcategoriaSelecionada === sub.id ? null : sub.id)}
                className={`h-11 px-6 flex items-center justify-center rounded-full text-sm font-medium border transition whitespace-nowrap cursor-pointer
                ${subcategoriaSelecionada === sub.id
                ? "bg-[#4D9DE0] text-white border-[#4D9DE0]" 
                : "bg-white text-[#4D9DE0] border-[#4D9DE0]/30 hover:border-[#4D9DE0]"
                }`}
                            >
                {sub.nome}
                </button>
            ))}
            </div>

        {/*ordenação de produtos */}
          {produtos.length > 0 && (
            <div className="flex items-center gap-3 relative">
            
            <span className="text-sm font-medium text-black"></span>

            <div className="relative">
              
              <button
                onClick={() => setIsOrdenacaoMenuOpen(!isOrdenacaoMenuOpen)}
                className="w-[450px] h-11 px-6 flex items-center justify-between bg-white border border-gray-200 rounded-full  font-medium text-[#4D9DE0] shadow-sm outline-none cursor-pointer hover:border-gray-300 transition-all"              >
    
                <span>
                    Ordenar por: <span className="font-bold">{ordenacao}</span>
                </span>
                <Image
                    src="/down_arrow.png" 
                    alt="Ícone de Ordenação"
                    width={20}                    
                    height={20}                  
                    className="object-contain" 
                    />
                    
              </button>

              {/* Menu de opções */}
              {isOrdenacaoMenuOpen && (
                <ul className="absolute top-full right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-2xl shadow-lg z-50 py-2">
                  {ORDENACOES.map((op) => (
                    <li key={op}>
                      <button
                        onClick={() => {
                          setOrdenacao(op);
                          setIsOrdenacaoMenuOpen(false);
                        }}
                        className={`w-full text-left px-6 py-3 text-sm transition ${
                          ordenacao === op
                            ? 'bg-sky-50 text-sky-600 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {op}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )} 
    </div>

      {produtos.length === 0 ? (
         <p className="text-center text-gray-500 text-2xl mt-12 mb-12">Nenhum produto encontrado nesta categoria.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-fit mx-auto">   
            {produtos.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>

          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-3 mt-16 mb-8">
              <button
                onClick={() => handlePagina(paginaAtual - 1)}
                disabled={paginaAtual === 1}
                className="text-black text-lg disabled:opacity-30 cursor-pointer font-bold px-2"
              >
                {"<"}
              </button>

              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handlePagina(num)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition cursor-pointer
                    ${num === paginaAtual
                      ? "bg-black text-white scale-110"
                      : "text-black hover:bg-gray-200"
                    }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => handlePagina(paginaAtual + 1)}
                disabled={paginaAtual === totalPaginas}
                className="text-black text-lg disabled:opacity-30 cursor-pointer font-bold px-2"
              >
                {">"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}