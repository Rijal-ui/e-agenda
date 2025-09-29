// components/Header.tsx

import React from 'react';
import Image from 'next/image'; // Import komponen Image dari Next.js
import Link from 'next/link';

const Header = () => {
  return (
    <div className="bg-white p-3 rounded-2xl shadow-lg border-b-6 border-blue-400 flex items-center space-x-4 justify-between">
      <div className="flex items-center space-x-4">
        <Image
          src="/logo_kominfo.png" // Ganti dengan path logo Anda
          alt="Logo Dinas Komunikasi dan Informatika"
          width={60} // Sesuaikan ukuran lebar
          height={60} // Sesuaikan ukuran tinggi
          className="rounded-full" // Opsional: membuat logo berbentuk lingkaran
        />
        <div>
          <h1 className="text-4xl font-extrabold text-blue-950">E - Agenda</h1>
          <p className="text-blue-950 mt-1 text-sm md:text-base">Display Agenda Dinas Komunikasi dan Informatika</p>
        </div>
      </div>
      <Link href="//e-agenda.hstkab.go.id">
       <button className="px-6 py-2 bg-blue-950 text-white font-bold rounded-2xl hover:bg-blue-400 hover:text-blue-950 transition-colors duration-200 shadow-md">
        Login
      </button>
      </Link>
    </div>
  );
};

export default Header;