import React from "react";
import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Header() {
  const session = await getSession();

  return (
    <nav className="bg-white">
      <div className="container mx-auto flex justify-between items-center px-2">
        <Image src="/logo.png" alt="Logo" width={45} height={45} />
        <div>{session && <a href="/api/auth/logout">Logout</a>}</div>
      </div>
    </nav>
  );
}
