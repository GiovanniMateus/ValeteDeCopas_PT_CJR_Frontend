'use client';

import { useEffect, useState } from 'react';

import { api } from '@/services/api';
import ProdutoCard from './card_produto';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;

  imagens?: {
    urlImagem: string;
  }[];
}

interface ProdutosLojaPaginadosProps {
  lojaId: number;
}

export default function ProdutosLojaPaginados({
  lojaId,
}: ProdutosLojaPaginadosProps) {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);

  async function carregarProdutos(page: number) {

    try {

      setLoading(true);

      const response = await api.get('/produtos', {
        params: {
          lojaId,
          page,
          size: 15,
        },
      });

      setProdutos(response.data.content ?? []);
      setTotalPaginas(response.data.totalPages ?? 1);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    if (!lojaId) return;

    carregarProdutos(paginaAtual);

  }, [lojaId, paginaAtual]);

  return (
    <section className="mt-16">

      <div className="flex items-center gap-3 mb-8">

        <h2 className="text-black text-[44px] font-bold leading-none">
          Todos os Produtos
        </h2>

      </div>

      {loading && (
        <div className="text-center py-10">
          Carregando produtos...
        </div>
      )}

      {!loading && produtos.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Nenhum produto encontrado.
        </div>
      )}

      {!loading && produtos.length > 0 && (

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-8
          "
        >

          {produtos.map((produto) => (

            <ProdutoCard
              key={produto.id}
              produto={produto}
            />

          ))}

        </div>

      )}

      {totalPaginas > 1 && (

        <div className="flex justify-center items-center gap-2 mt-12">

          <button
            onClick={() =>
              setPaginaAtual((prev) => prev - 1)
            }
            disabled={paginaAtual === 1}
            className="
              px-4
              py-2
              rounded-lg
              border
              border-gray-300
              disabled:opacity-40
              disabled:cursor-not-allowed
              hover:bg-gray-100
            "
          >
            ←
          </button>

          {Array.from(
            { length: totalPaginas },
            (_, index) => {

              const pagina = index + 1;

              return (
                <button
                  key={pagina}
                  onClick={() =>
                    setPaginaAtual(pagina)
                  }
                  className={`
                    w-10
                    h-10
                    rounded-lg
                    font-semibold
                    transition

                    ${
                      paginaAtual === pagina
                        ? 'bg-[#6C3BFF] text-white'
                        : 'border border-gray-300 hover:bg-gray-100'
                    }
                  `}
                >
                  {pagina}
                </button>
              );
            }
          )}

          <button
            onClick={() =>
              setPaginaAtual((prev) => prev + 1)
            }
            disabled={paginaAtual === totalPaginas}
            className="
              px-4
              py-2
              rounded-lg
              border
              border-gray-300
              disabled:opacity-40
              disabled:cursor-not-allowed
              hover:bg-gray-100
            "
          >
            →
          </button>

        </div>

      )}

    </section>
  );
}