'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
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
    router.push("/home");
  }

  return (
    <main className="min-h-screen bg-white">

      {/* NAVBAR */}
      <nav className="relative h-[92px] w-full">

        <Image
          src="/navbar.jpg"
          alt="Navbar"
          fill
          className="object-cover"
        />

        {/* BOTÕES */}
        <div className="absolute inset-0 flex items-center justify-end gap-6 pr-2.5">

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

      {/* RESTANTE DA PÁGINA */}
      <section className="bg-white min-h-[calc(100vh-92px)]">
        
      </section>

    </main>
  );
}