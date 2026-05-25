'use client'
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ModalCriarProdutoProps {
  onClose: () => void;
}

export default function ModalCriarProduto({ onClose }: ModalCriarProdutoProps) {
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [stickerFile, setStickerFile] = useState<File | null>(null);
  
    

  const handleSubmit = async () => {
    
    try {
      setMensagemSucesso('Produto criado com sucesso!');
      
      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (error) {
      console.error('Erro ao criar produto:', error);
      alert('Erro ao criar produto');
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
          
          {/* título */}
          <h2 className="font-spartan w-[411px] h-[43px] text-[52px] text-black text-center leading-none">
            Adicionar Produto
          </h2>

        <label 
            className={`mt-[40px] flex flex-col items-center justify-center w-[826px] h-[177px] cursor-pointer transition-all duration-300 ${
            stickerFile 
                ? "border-2 border-solid border-[#7C3AED] bg-[#7C3AED]/5 shadow-sm rounded-[24px]" 
                : "bg-[url('/Rectangle.png')] bg-center bg-[length:100%_100%] bg-no-repeat hover:opacity-80"
            }`}>
            {stickerFile ? (
            <>
                <div className="w-[45px] h-[45px] bg-[#7C3AED] rounded-full flex items-center justify-center mb-3 shadow-md">
                <span className="text-white text-xl font-bold">✓</span>
                </div>
                <span className="text-[20px] font-medium text-[#7C3AED]">
                {stickerFile.name}
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
            onChange={(e) => setStickerFile(e.target.files?.[0] || null)}
            />
        </label>

         


          <button 
            type="button" onClick={handleSubmit}
            className="mt-[40px] mb-[10px] w-[370px] h-[60px] rounded-full bg-[#7C3AED] text-white text-[24px] font-medium shadow-[0_10px_20px_rgba(124,58,237,0.4)] transition-colors cursor-pointer"
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