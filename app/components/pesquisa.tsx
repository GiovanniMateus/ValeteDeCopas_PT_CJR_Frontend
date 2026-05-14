'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function Pesquisa() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  return (
    <div className="w-full max-w-[560px] h-[50px] bg-white rounded-full flex items-center px-5">
      <input
        type="text"
        placeholder="Procurar por..."
        className="w-full outline-none bg-transparent text-[#6A38F380] placeholder:text-[#6A38F380]"
      />

      <Search className="text-[#6A38F380] w-6 h-6" />
    </div>
  );
}