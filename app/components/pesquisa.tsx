'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface Props {
  pesquisa: string;
  setPesquisa: React.Dispatch<React.SetStateAction<string>>;
}

export default function Pesquisa({ pesquisa, setPesquisa }: Props) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  return (
    <div className="w-full max-w-[560px] h-[50px] bg-white rounded-full flex items-center px-5">
      <input
        type="text"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        placeholder="Procurar por..."
        className="w-full outline-none bg-transparent text-[#6A38F380] placeholder:text-[#6A38F380]"
      />

      <Search className="text-[#6A38F380] w-6 h-6" />
    </div>
  );
}