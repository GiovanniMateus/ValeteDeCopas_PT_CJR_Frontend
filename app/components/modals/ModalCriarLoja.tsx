'use client'
import { X } from 'lucide-react';
import Image from 'next/image';

interface ModalCriarLojaProps {
  onClose: () => void;
}

export default function ModalCriarLoja({ onClose }: ModalCriarLojaProps) {
  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ">
      
      
      <div className="relative w-[800px] h-[1022px] max-h-[95vh] overflow-y-auto rounded-2xl bg-white p-10 shadow-xl flex flex-col">
        
        <button onClick={onClose}
        className="absolute top-[22px] left-[750px] w-[33px] h-[33px] flex items-center justify-center transition hover:opacity-70 cursor-pointer">
  
        <Image src="/icone_fechar.png" alt="Fechar" width={33} height={33} priority />
        </button>
        
        <div className="w-full flex flex-col items-center pt-[35px]">
          
          
          <h2 className="w-[318px] h-[43px] text-[33px] font-bold text-black text-center leading-none">
            Adicionar loja
          </h2>

          


        </div>
        

    

      </div>
    </div>
  );
}