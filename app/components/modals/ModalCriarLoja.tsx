'use client'
import { X } from 'lucide-react';
import Image from 'next/image';

interface ModalCriarLojaProps {
  onClose: () => void;
}

export default function ModalCriarLoja({ onClose }: ModalCriarLojaProps) {
  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ">
      
      {/**?dadw */}
      <div className="relative w-[1020px] h-[1022px] max-h-[95vh] overflow-y-auto rounded-2xl bg-[#ededed] p-10 shadow-xl flex flex-col">
        
        <button onClick={onClose}
        className="absolute top-[22px] left-[955px] w-[23px] h-[23px] flex items-center justify-center transition hover:opacity-70 cursor-pointer">
  
        <Image src="/icone_fechar.png" alt="Fechar" width={33} height={33} priority />
        </button>
        
        <div className="w-full flex flex-col items-center pt-[15px]">
          
          {/* titulo */}
          <h2 className="w-[318px] h-[43px] text-[30px] font-bold text-black text-center leading-none">
            Adicionar loja
          </h2>

          {/* input para o nome da loja*/}          
          <input 
            type="text" 
            placeholder="Nome da loja" 
            className="mt-[10px] w-[826px] h-[65px] rounded-[99px] bg-white px-8 text-[20px] text-gray-900 placeholder-gray-500 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-colors"
          />

          
          { /*  listagem de categoria */}
          <div className="relative mt-[15px] w-[826px] h-[65px]">
            <select 
              required 
              defaultValue=""
              className="w-full h-full appearance-none rounded-[99px] bg-white px-8 text-[20px] text-gray-900 invalid:text-gray-500 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-colors cursor-pointer">
              
              <option value="" disabled hidden>Categoria</option>
              

            </select>
            
            <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <Image 
                src="/seta_categoria.png"
                alt="Abrir lista de categorias"
                width={24} 
                height={24} 
              />
            </div>
            
          </div>


          {/* campos para upload de imagem:*/}

          <label className="mt-[20px] flex flex-col items-center justify-center w-[826px] h-[177px] bg-[url('/Rectangle.png')] bg-center bg-[length:100%_100%] bg-no-repeat cursor-pointer hover:opacity-80 transition-opacity">
            <Image src="/icone_upload.png" alt="Ícone de upload" width={28} height={35} className="mb-3" />
            <span className="text-[20px] text-gray-800">Anexe a foto de perfil de sua loja</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>

          <label className="mt-[20px] flex flex-col items-center justify-center w-[826px] h-[177px] bg-[url('/Rectangle.png')] bg-center bg-[length:100%_100%] bg-no-repeat cursor-pointer hover:opacity-80 transition-opacity">
            <Image src="/icone_upload.png" alt="Ícone de upload" width={28} height={35} className="mb-3" />
            <span className="text-[20px] text-gray-800">Anexe a foto de perfil de sua loja</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>

          <label className="mt-[20px] flex flex-col items-center justify-center w-[826px] h-[177px] bg-[url('/Rectangle.png')] bg-center bg-[length:100%_100%] bg-no-repeat cursor-pointer hover:opacity-80 transition-opacity">
            <Image src="/icone_upload_banner.png" alt="Ícone de upload" width={28} height={35} className="mb-3" />
            <span className="text-[20px] text-gray-800">Anexe o banner de sua loja</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>

        
          <button 
            type="button"
            className="mt-[20px] mb-[10px] w-[370px] h-[60px] rounded-full bg-[#7C3AED] text-white text-[24px] font-medium shadow-[0_10px_20px_rgba(124,58,237,0.4)] transition-colors cursor-pointer"
          >
            Adicionar
          </button>


        </div>
        

    

      </div>
    </div>
  );
}