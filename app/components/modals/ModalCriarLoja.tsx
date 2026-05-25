'use client'
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';


interface ModalCriarLojaProps {
  onClose: () => void;
}

export default function ModalCriarLoja({ onClose }: ModalCriarLojaProps) {
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([]);
  const [categoriaAberta, setCategoriaAberta] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<{ id: number; nome: string } | null>(null);
  const [nome, setNome] = useState(''); 
  const [stickerFile, setStickerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);


  useEffect(() => {
  async function carregarCategorias() {
    try {
      
      const response = await fetch('http://localhost:3001/categorias'); 
      if (response.ok) {
        const dados = await response.json();
        setCategorias(dados);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }
  carregarCategorias();
  }, []);

  const handleSelecionarCategoria = (categoria: { id: number; nome: string }) => {
    setCategoriaSelecionada(categoria);
    setCategoriaAberta(false);
  };


  const handleSubmit = async () => {
    if (!nome || !categoriaSelecionada) {
      alert("Por favor, preencha o nome e selecione uma categoria.");
      return;
    }

    const formData = new FormData();
    
    
    formData.append('nome', nome);
    formData.append('categoriaId', String(categoriaSelecionada.id));
    formData.append('descricao', ''); 

  
    if (logoFile) formData.append('logo', logoFile);
    if (bannerFile) formData.append('banner', bannerFile);
    if (stickerFile) formData.append('sticker', stickerFile);

    setCarregando(true);

    try {
      
      await axios.post('http://localhost:3001/lojas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setMensagemSucesso('Loja criada com sucesso!');
      
      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (error) {
      console.error('Erro ao criar loja:', error);
      alert('Erro ao criar loja ');
      setCarregando(false);

    }
  };
  

  return (
   
 
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ">
      
      
      <div className="relative w-[1020px] h-[1022px] max-h-[95vh] overflow-y-auto rounded-2xl bg-[#ededed] p-10 shadow-xl flex flex-col">
        
        <button onClick={onClose}
        className="absolute top-[22px] left-[955px] w-[23px] h-[23px] flex items-center justify-center transition hover:opacity-70 cursor-pointer">
  
        <Image src="/icone_fechar.png" alt="Fechar" width={33} height={33} priority />
        </button>
        
        <div className="w-full flex flex-col items-center pt-[15px]">
          
          {/* titulo */}
          <h2 className="font-spartan w-[318px] h-[43px] text-[50px] font-bold text-black text-center leading-none">
            Adicionar loja
          </h2>

          
          {/*  input para o nome da loja*/}          
          <input 
            type="text" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da loja" 
            className="mt-[15px] w-[826px] h-[65px] rounded-[99px] bg-white px-8 text-[20px] text-gray-900 placeholder-gray-500 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-colors"
          />

          

          {/* input para selecionar a categoria:*/}
          <div 
            className={`relative mt-[15px] w-[826px] bg-white transition-all duration-300 overflow-hidden ${
              categoriaAberta ? 'rounded-[32px] pb-6 shadow-md z-20' : 'rounded-[99px] h-[65px] z-10'
            }`}
          >
            
            <div 
              onClick={() => setCategoriaAberta(!categoriaAberta)}
              className="w-full h-[65px] px-8 flex items-center justify-between cursor-pointer"
            >
              <span className={`text-[20px] ${categoriaSelecionada ? 'text-gray-900' : 'text-gray-500'}`}>
                {categoriaSelecionada ? categoriaSelecionada.nome : 'Categoria'}
              </span>
              <div className={`transition-transform duration-300 ${categoriaAberta ? 'rotate-180' : ''}`}>
                <Image 
                  src="/seta_categoria.png" 
                  alt="Abrir lista" 
                  width={24} 
                  height={24} 
                />
              </div>
            </div>

            
            {categoriaAberta && (
              <div className="px-8 mt-2 flex flex-col gap-2">
                {categorias.map((cat) => (
                  <label 
                    key={cat.id} 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => handleSelecionarCategoria(cat)}
                  >
                    {/* Botão circular roxo customizado */}
                    <div className="relative w-[20px] h-[20px] rounded-full border-[2px] border-[#7C3AED] flex items-center justify-center">
                      {categoriaSelecionada?.id === cat.id && (
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


          {/* campos para upload de imagem: */}

          <label 
            className={`mt-[20px] flex flex-col items-center justify-center w-[826px] h-[177px] cursor-pointer transition-all duration-300 ${
              stickerFile 
                ? "border-2 border-solid border-[#7C3AED] bg-[#7C3AED]/5 shadow-sm rounded-[24px]" 
                : "bg-[url('/Rectangle.png')] bg-center bg-[length:100%_100%] bg-no-repeat hover:opacity-80"
            }`}
          >
            {stickerFile ? (
              <>
                <div className="w-[45px] h-[45px] bg-[#7C3AED] rounded-full flex items-center justify-center mb-3 shadow-md">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <span className="text-[20px] font-medium text-[#7C3AED]">
                  {stickerFile.name}
                </span>
                <span className="text-[14px] text-gray-500 mt-1">Clique para trocar a imagem</span>
              </>
            ) : (
              <>
                <Image src="/icone_upload.png" alt="Ícone de upload" width={28} height={35} className="mb-3" />
                <span className="text-[20px] text-gray-800">Anexe a foto de perfil de sua loja</span>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => setStickerFile(e.target.files?.[0] || null)}
            />
          </label>

          
          <label 
            className={`mt-[20px] flex flex-col items-center justify-center w-[826px] h-[177px] cursor-pointer transition-all duration-300 ${
              logoFile 
                ? "border-2 border-solid border-[#7C3AED] bg-[#7C3AED]/5 shadow-sm rounded-[24px]" 
                : "bg-[url('/Rectangle.png')] bg-center bg-[length:100%_100%] bg-no-repeat hover:opacity-80"
            }`}
          >
            {logoFile ? (
              <>
                <div className="w-[45px] h-[45px] bg-[#7C3AED] rounded-full flex items-center justify-center mb-3 shadow-md">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <span className="text-[20px] font-medium text-[#7C3AED]">
                  {logoFile.name}
                </span>
                <span className="text-[14px] text-gray-500 mt-1">Clique para trocar a logo</span>
              </>
            ) : (
              <>
                <Image src="/icone_upload.png" alt="Ícone de upload" width={28} height={35} className="mb-3" />
                <span className="text-[20px] text-gray-800">Anexe a logo em SVG de sua loja</span>
              </>
            )}
            <input 
              type="file" 
              accept=".svg" 
              className="hidden" 
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
            />
          </label>

          <label 
            className={`mt-[20px] flex flex-col items-center justify-center w-[826px] h-[177px] cursor-pointer transition-all duration-300 ${
              bannerFile 
                ? "border-2 border-solid border-[#7C3AED] bg-[#7C3AED]/5 shadow-sm rounded-[24px]" 
                : "bg-[url('/Rectangle.png')] bg-center bg-[length:100%_100%] bg-no-repeat hover:opacity-80"
            }`}
          >
            {bannerFile ? (
              <>
                <div className="w-[45px] h-[45px] bg-[#7C3AED] rounded-full flex items-center justify-center mb-3 shadow-md">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <span className="text-[20px] font-medium text-[#7C3AED]">
                  {bannerFile.name}
                </span>
                <span className="text-[14px] text-gray-500 mt-1">Clique para trocar o banner</span>
              </>
            ) : (
              <>
                <Image src="/icone_upload_banner.png" alt="Ícone de upload" width={28} height={35} className="mb-3" />
                <span className="text-[20px] text-gray-800">Anexe o banner de sua loja</span>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
            />
          </label>




          <button 
            type="button" onClick={handleSubmit} disabled={carregando}
           className={`mt-[20px] mb-[10px] w-[370px] h-[60px] rounded-full text-white text-[24px] font-medium 
            transition-colors cursor-pointer ${
            carregando ? 'bg-gray-400 cursor-not-allowed shadow-none' :
            'bg-[#7C3AED] shadow-[0_10px_20px_rgba(124,58,237,0.4)]' }`}>
            {carregando ? 'Adicionando...' : 'Adicionar'} 
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