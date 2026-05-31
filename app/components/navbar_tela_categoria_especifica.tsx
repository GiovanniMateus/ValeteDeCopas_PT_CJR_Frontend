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

      <Link href="/home">
      <Image
          src="/Stockio.png"
          alt="Logo"
          width={140}
          height={60}
          className="object-contain"
        />
      </Link>

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
                href={`/user_profile/${user?.id}`}
                
                className="group relative px-6 py-3 rounded-full hover:scale-105 transition flex items-center justify-center"
            >

                <Image
                src="/ion_person_white.svg"
                alt="Perfil"
                width={35}
                height={35}
                className="object-contain group-hover:hidden"
                />

                <Image
                src="/ion_person.svg"
                alt="Perfil"
                width={35}
                height={35}
                className="object-contain hidden group-hover:block"
                />

            </Link>

            <Link
                href="/home"
                onClick={handleLogout}
                className="group relative px-6 py-3 rounded-full hover:scale-105 transition flex items-center justify-center"
            >

                <Image
                src="/arrow-exit.svg"
                alt="Logout"
                width={28}
                height={27}
                className="object-contain group-hover:hidden"
                />

                <Image
                src="/arrow-red.svg"
                alt="Logout"
                width={28}
                height={27}
                className="object-contain hidden group-hover:block"
                />
            </Link>
            </>
        )}

      </div>
    </nav>
  );
}