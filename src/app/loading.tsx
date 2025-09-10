// components/SplashLoader.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SplashLoaderProps {
  children: React.ReactNode;
  duration?: number; // Durasi dalam milidetik, default 3000ms
}

const SplashLoader = ({ children, duration = 5000 }: SplashLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer); // Membersihkan timer saat komponen di-unmount
  }, [duration]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <Image
            src="/logo_kominfo.png"
            alt="Logo E-Agenda"
            width={150}
            height={150}
          />
          <h1 className="text-4xl font-extrabold text-blue-700">E - Agenda</h1>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SplashLoader;