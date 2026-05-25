'use client'
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ModalCriarProdutoProps {
  onClose: () => void;
}

export default function ModalCriarProduto({ onClose }: ModalCriarProdutoProps) {
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [nome, setNome] = useState('');
  const [subCategorias, setSubCategorias] = useState<{ id: number; nome: string }[]>([]);
  const [subCategoriaAberta, setSubCategoriaAberta] = useState(false);
  const [subCategoriaSelecionada, setSubCategoriaSelecionada] = useState<{ id: number; nome: string } | null>(null);
  const [descricao, setDescricao] = useState(''); 
  const [preco, setPreco] = useState(''); 
  const [quantidade, setQuantidade] = useState<number | ''>(1);   
  const LIMITE_MAXIMO = 9999
  const [foto1, setFoto1] = useState<File | null>(null); 
  const [foto2, setFoto2] = useState<File | null>(null); 
  const [foto3, setFoto3] = useState<File | null>(null); 
  const [foto4, setFoto4] = useState<File | null>(null);

  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value.replace(/\D/g, '');

    if (!valor) {
        setPreco('');
        return;
    }
  
    const valorNumerico = Number(valor) / 100;

    const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valorNumerico);

    setPreco(valorFormatado);
    };


    const handleDiminuir = () => {
    if (typeof quantidade === 'number' && quantidade > 1) {
        setQuantidade(quantidade - 1);
    } else if (quantidade === '') {
        setQuantidade(1);
        }
    };

    const handleAumentar = () => {
    const valorAtual = typeof quantidade === 'number' ? quantidade : 0;
    if (valorAtual < LIMITE_MAXIMO) {
        setQuantidade(valorAtual + 1);
        }
    };

    const handleChangeQuantidade = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorDigitado = e.target.value;
    
    if (valorDigitado === '') {
        setQuantidade('');
        return;
    }

    const apenasNumeros = valorDigitado.replace(/\D/g, '');
    const numeroFormatado = parseInt(apenasNumeros, 10);

    if (!isNaN(numeroFormatado)) {
        
        if (numeroFormatado > LIMITE_MAXIMO) {
            setQuantidade(LIMITE_MAXIMO);
            } 
            else {
            setQuantidade(numeroFormatado);
        }
    }
    };

    const handleBlurQuantidade = () => {
    if (quantidade === '' || quantidade < 1) {
        setQuantidade(1);
    }
    };


    useEffect(() => {
    async function carregarSubCategorias() {
      try {
        
        const response = await fetch('http://localhost:3001/subcategorias'); 
        if (response.ok) {
          const dados = await response.json();

          setSubCategorias(dados);
            } 
        } 
        catch (error) {
        console.error('Erro ao buscar sub-categorias:', error);
      }
    }
    carregarSubCategorias();
    }, []);
  

    const handleSelecionarSubCategoria = (categoria: { id: number; nome: string }) => {
      setSubCategoriaSelecionada(categoria);
      setSubCategoriaAberta(false);
    };
    

  const handleSubmit = async () => {
    if (!foto1 && !foto2 && !foto3 && !foto4) {
      alert("Por favor, anexe pelo menos uma foto do produto");
      return;
    }
    if (!nome || !descricao || !preco || !subCategoriaSelecionada || quantidade === '') {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const precoLimpo = preco.replace(/[^\d,]/g, '').replace(',', '.');

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('subcategoriaId', String(subCategoriaSelecionada.id));
    formData.append('preco', precoLimpo);
    formData.append('estoque', String(quantidade));

    // OBS: como a página de loja ainda não foi desenvolvida, é necessário implementar a lógica para pegar o id
    // referente a essa loja, aqui estou passando um id padrão 1
    formData.append('lojaId', '1'); 

    if (foto1) formData.append('imagens', foto1);
    if (foto2) formData.append('imagens', foto2);
    if (foto3) formData.append('imagens', foto3);
    if (foto4) formData.append('imagens', foto4);

    try {
        await axios.post('http://localhost:3001/produtos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMensagemSucesso('Produto criado com sucesso!');
      
      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (error) {
      console.error('Erro ao criar produto:', error);
      alert('Erro ao criar produto. Verifique os dados e tente novamente');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ">
      
      <div className="relative w-[1020px] h-[1022px] max-h-[95vh] overflow-y-auto rounded-2xl bg-[#ededed] p-10 shadow-xl flex flex-col">
        
        <button onClick={onClose}
        className="absolute top-[22px] left-[970px] w-[23px] h-[23px] flex items-center justify-center transition hover:opacity-70 cursor-pointer">
          <Image src="/icone_fechar.png" alt="Fechar" width={33} height={33} priority />
        </button>
        
        <div className="w-full flex flex-col items-center pt-[15px]">
          
          {/* Título */}
          <h2 className="font-spartan w-[411px] h-[43px] text-[52px] text-black text-center leading-none">
            Adicionar Produto
          </h2>

        <label 
            className={`mt-[40px] flex flex-col items-center justify-center w-[826px] h-[177px] cursor-pointer transition-all duration-300 ${
            foto1 
                ? "border-2 border-solid border-[#7C3AED] bg-[#7C3AED]/5 shadow-sm rounded-[24px]" 
                : "bg-[url('/Rectangle.png')] bg-center bg-[length:100%_100%] bg-no-repeat hover:opacity-80"
            }`}>
            {foto1 ? (
            <>
                <div className="w-[45px] h-[45px] bg-[#7C3AED] rounded-full flex items-center justify-center mb-3 shadow-md">
                <span className="text-white text-xl font-bold">✓</span>
                </div>
                <span className="text-[20px] font-medium text-[#7C3AED]">
                {foto1.name}
                </span>
                <span className="text-[14px] text-gray-500 mt-1">Clique para trocar a imagem</span></>) : 
                (<>
                <Image src="/icone_camera.png" alt="Ícone de upload" width={84} height={77} className="mb-3" />
                <span className="text-[20px] text-gray-800">Anexe as foto do seu produto</span>
            </>
            )}
            <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => setFoto1(e.target.files?.[0] || null)}
            />
        </label>

            {/*caixas menores:*/ }
        <div className="flex w-[826px] gap-6 mt-[20px] justify-between">
  
            <label 
                className={`flex flex-col items-center justify-center w-[228px] h-[147px] cursor-pointer transition-all duration-300 ${
                foto2 
                    ? "border-2 border-solid border-[#7C3AED] bg-[#7C3AED]/5 shadow-sm rounded-[24px]" 
                    : "bg-[url('/Rectangle_small.png')] bg-center bg-[length:100%_100%] bg-no-repeat hover:opacity-80"
                }`}>
                {foto2 ? (
                <>
                    <div className="w-[45px] h-[45px] bg-[#7C3AED] rounded-full flex items-center justify-center mb-3 shadow-md">
                    <span className="text-white text-xl font-bold">✓</span>
                    </div>
                    <span className="text-[20px] font-medium text-[#7C3AED]">
                    {foto2.name}
                    </span>
                    <span className="text-[14px] text-gray-500 mt-1">Clique para trocar a imagem</span></>) : 
                    (<>
                    <Image src="/icone_camera.png" alt="Ícone de upload" width={84} height={77} className="mb-3" />
                </>
                )}
                <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => setFoto2(e.target.files?.[0] || null)}
                />
            </label>

             <label 
                className={`flex flex-col items-center justify-center w-[228px] h-[147px] cursor-pointer transition-all duration-300 ${
                foto3 
                    ? "border-2 border-solid border-[#7C3AED] bg-[#7C3AED]/5 shadow-sm rounded-[24px]" 
                    : "bg-[url('/Rectangle_small.png')] bg-center bg-[length:100%_100%] bg-no-repeat hover:opacity-80"
                }`}>
                {foto3 ? (
                <>
                    <div className="w-[45px] h-[45px] bg-[#7C3AED] rounded-full flex items-center justify-center mb-3 shadow-md">
                    <span className="text-white text-xl font-bold">✓</span>
                    </div>
                    <span className="text-[20px] font-medium text-[#7C3AED]">
                    {foto3.name}
                    </span>
                    <span className="text-[14px] text-gray-500 mt-1">Clique para trocar a imagem</span></>) : 
                    (<>
                    <Image src="/icone_camera.png" alt="Ícone de upload" width={84} height={77} className="mb-3" />
                </>
                )}
                <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => setFoto3(e.target.files?.[0] || null)}
                />
            </label>

             <label 
                className={`flex flex-col items-center justify-center w-[228px] h-[147px] cursor-pointer transition-all duration-300 ${
                foto4 
                    ? "border-2 border-solid border-[#7C3AED] bg-[#7C3AED]/5 shadow-sm rounded-[24px]" 
                    : "bg-[url('/Rectangle_small.png')] bg-center bg-[length:100%_100%] bg-no-repeat hover:opacity-80"
                }`}>
                {foto4 ? (
                <>
                    <div className="w-[45px] h-[45px] bg-[#7C3AED] rounded-full flex items-center justify-center mb-3 shadow-md">
                    <span className="text-white text-xl font-bold">✓</span>
                    </div>
                    <span className="text-[20px] font-medium text-[#7C3AED]">
                    {foto4.name}
                    </span>
                    <span className="text-[14px] text-gray-500 mt-1">Clique para trocar a imagem</span></>) : 
                    (<>
                    <Image src="/icone_camera.png" alt="Ícone de upload" width={84} height={77} className="mb-3" />
                </>
                )}
                <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => setFoto4(e.target.files?.[0] || null)}
                />
            </label>

        </div>

        {/*nome */}
         <input 
            type="text" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do Produto" 
            className="mt-[30px] w-[826px] h-[65px] rounded-[99px] bg-white px-8 text-[20px] text-gray-900 placeholder-gray-500 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-colors"
          />

        {/* input para selecionar a categoria:*/}
        <div 
        className={`relative mt-[15px] w-[826px] bg-white transition-all duration-300 overflow-hidden ${
            subCategoriaAberta ? 'rounded-[32px] pb-6 shadow-md z-20' : 'rounded-[99px] h-[65px] z-10'
        }`}>
        
        <div 
            onClick={() => setSubCategoriaAberta(!subCategoriaAberta)}
            className="w-full h-[65px] px-8 flex items-center justify-between cursor-pointer"
        >
            <span className={`text-[20px] ${subCategoriaSelecionada ? 'text-gray-900' : 'text-gray-500'}`}>
            {subCategoriaSelecionada ? subCategoriaSelecionada.nome : 'Subcategoria'}
            </span>
            <div className={`transition-transform duration-300 ${subCategoriaAberta ? 'rotate-180' : ''}`}>
            <Image 
                src="/seta_categoria.png" 
                alt="Abrir lista" 
                width={24} 
                height={24} 
            />
            </div>
        </div>

        {subCategoriaAberta && (
            <div className="px-8 mt-2 flex flex-col gap-2">
            {subCategorias.map((cat) => (
                <label 
                key={cat.id} 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => handleSelecionarSubCategoria(cat)}
                >
                <div className="relative w-[20px] h-[20px] rounded-full border-[2px] border-[#7C3AED] flex items-center justify-center">
                    {subCategoriaSelecionada?.id === cat.id && (
                        <div className="w-[10px] h-[10px] bg-[#7C3AED] rounded-full"></div>
                    )}
                </div>
                <span className="text-[20px] text-[#7C3AED] group-hover:opacity-80 transition-opacity">
                    {cat.nome}
                </span>
                </label>
            ))}
            </div>
        )}
        </div>

        {/* input descrição */}
         <textarea 
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição do Produto" 
            className="mt-[15px] w-[826px] h-[126px] pt-3 rounded-[27px] bg-white px-8 text-[20px] text-gray-900 placeholder-black focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-colors"
          />

       {/* preco do produto */}
        <input 
            type="text" 
            value={preco}
            onChange={handlePrecoChange}
            placeholder="Preço do produto" 
            className="mt-[15px] w-[826px] h-[65px] rounded-[99px] bg-white px-8 text-[20px] text-gray-900 placeholder-black focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-colors"
        />


        {/*quantidade estoque: valor máximo 9999 */}
        <div className="flex items-center justify-center gap-[60px] mt-[15px] mb-[10px]">
  
            <button 
                type="button" 
                onClick={handleDiminuir}
                className="w-[78px] h-[78px] rounded-full border-[2px] border-[#7C3AED] flex items-center justify-center hover:bg-[#7C3AED]/10 transition-colors cursor-pointer group"
            >
                <div className="w-[24px] h-[4px] bg-[#7C3AED] rounded-full group-hover:scale-110 transition-transform"></div>
            </button>

            <input
                type="text" 
                value={quantidade}
                onChange={handleChangeQuantidade}
                onBlur={handleBlurQuantidade}
                className="w-[150px] text-center text-[65px] font-medium text-[#7C3AED] bg-transparent outline-none font-spartan"
            />

            <button 
                type="button" 
                onClick={handleAumentar}
                className="w-[78px] h-[78px] rounded-full border-[2px] border-[#7C3AED] flex items-center justify-center hover:bg-[#7C3AED]/10 transition-colors cursor-pointer relative group"
            >
                <div className="absolute w-[24px] h-[4px] bg-[#7C3AED] rounded-full group-hover:scale-110 transition-transform"></div>
                <div className="absolute w-[4px] h-[24px] bg-[#7C3AED] rounded-full group-hover:scale-110 transition-transform"></div>
            </button>

            </div>




          <button 
            type="button" onClick={handleSubmit}
            className="mt-[20px] mb-[10px] w-[370px] h-[60px] rounded-full bg-[#7C3AED] text-white text-[24px] font-medium shadow-[0_10px_20px_rgba(124,58,237,0.4)] transition-colors cursor-pointer"
          >
            Adicionar
          </button>

        
          {mensagemSucesso && (
            <div className="mt-4 mb-4 p-4 bg-green-500 text-white rounded-lg text-center font-bold shadow-lg animate-bounce">
              {mensagemSucesso}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}