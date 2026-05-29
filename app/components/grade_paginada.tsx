'use client'

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import ProdutoCard, { Produto } from "./card_produto";

interface GradePaginadaProps {
  categoriaId: number;
}

//const SUBCATEGORIAS = ["Celulares", "Notebooks", "TVs", "Acessórios", "Outros"];
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
  
  const [subcategoria, setSubcategoria] = useState<string | null>(null);
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
  }, [categoriaId, paginaAtual,subcategoriaSelecionada]);


  useEffect(() => {
    setPaginaAtual(1);
  }, [subcategoriaSelecionada]);


  function handlePagina(pagina: number) {
    if (pagina < 1 || pagina > totalPaginas) return;
    setPaginaAtual(pagina);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }



  return (
    <div className="flex flex-col w-fit mx-auto mt-12 mb-20 ">
      
        {/*Filtros */}
        <div className="flex items-center justify-between w-full mb-10 ">

        {/* subcategorias*/}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {listaSubcategorias.map((sub) => (
                <button
                key={sub.id}
                onClick={() => setSubcategoriaSelecionada(subcategoriaSelecionada === sub.id ? null : sub.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium border transition whitespace-nowrap cursor-pointer
                    ${subcategoriaSelecionada === sub.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-gray-500"
                    }`}
                >
                {sub.nome}
                </button>
            ))}
            </div>

        {/*ordenação de produtos */}
            <div className="flex items-center ">
            <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm text-black outline-none cursor-pointer hover:border-gray-500 transition"
            >
                {ORDENACOES.map((op) => (
                <option key={op} value={op}>{op}</option>
                ))}
            </select>
        </div>
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