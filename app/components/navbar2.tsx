'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  }

  return (
    <nav className="h-[92px] w-full bg-black flex items-center justify-between px-8">

      {/* LOGO */}
      <Image
        src="/Stockio.png"
        alt="Logo"
        width={140}
        height={60}
        className="object-contain"
      />

      {/* BOTÕES */}
      <div className="flex items-center gap-6">

        {!user ? (
          <>
            <Link
              href="/login"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              LOGIN
            </Link>

            <Link
              href="/cadastro"
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              CADASTRE-SE
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/perfil"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              PERFIL
            </Link>

            <button
              onClick={handleLogout}
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              LOGOUT
            </button>
          </>
        )}

      </div>
    </nav>
  );
}