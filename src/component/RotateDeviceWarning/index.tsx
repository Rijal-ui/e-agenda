// components/RotateDeviceWarning.tsx

"use client";

import React, { useState, useEffect } from 'react';
import LottieRotate from "@/component/RotateDeviceWarning/RotatePhone";

const RotateDeviceWarning = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsMobile(window.innerWidth < 768); // Asumsi lebar mobile < 768px
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    // Jalankan sekali saat komponen dimuat
    checkOrientation();

    // Tambahkan event listener untuk mendeteksi perubahan orientasi
    window.addEventListener('resize', checkOrientation);

    // Fungsi cleanup untuk membersihkan event listener
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  if (!isMobile || !isPortrait) {
    return null; // Tidak tampilkan peringatan jika bukan mobile atau dalam mode landscape
  }

  return (
    <div className="fixed inset-0 z-[100] bg-blue-950 bg-opacity-95 flex flex-col items-center justify-center p-8 text-center text-white">
      <div className="flex flex-col items-center space-y-6">
        {/* Ikon untuk menunjukkan putar layar */}

        <LottieRotate/>
        <h2 className="text-2xl font-bold">Harap Putar Perangkat Anda</h2>
        <p className="text-base text-gray-300">
          Tampilan ini dioptimalkan untuk mode lanskap. Silakan putar ponsel Anda.
        </p>
      </div>
    </div>
  );
};

export default RotateDeviceWarning;