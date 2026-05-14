'use client'

import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
}

export default function CarrosselProdutos() {

  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function buscarProdutos() {

    try {

      const response = await api.get("/produtos");

      setProdutos(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="mt-10">

      <h2 className="text-black text-3xl font-bold mb-6">
        Produtos
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4">

        {produtos.map((produto) => (

          <div
            key={produto.id}
            className="min-w-[250px] bg-white rounded-2xl p-4 shadow-md"
          >

            <div className="w-full h-[180px] bg-gray-200 rounded-xl" />

            <h3 className="text-black text-xl font-bold mt-4">
              {produto.nome}
            </h3>

            <p className="text-gray-500">
              {produto.descricao}
            </p>

            <p className="text-black text-2xl font-bold mt-3">
              R$ {produto.preco}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}