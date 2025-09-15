// components/SplashLoader.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LottieLoading from "@/component/SplashLoader/Loading";

interface SplashLoaderProps {
  children: React.ReactNode;
  duration?: number; // Durasi dalam milidetik, default 3000ms
  transitionDuration?: number; // Durasi transisi naik ke atas dalam ms, default 700ms
}

const SplashLoader = ({ children, duration = 5000, transitionDuration = 1000 }: SplashLoaderProps) => {
  const [showSplash, setShowSplash] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    // Timer untuk memulai animasi (setelah durasi diam)
    const startAnimationTimer = setTimeout(() => {
      setAnimateOut(true);
    }, duration);

    // Timer untuk menyembunyikan komponen sepenuhnya (setelah animasi selesai)
    const hideComponentTimer = setTimeout(() => {
      setShowSplash(false);
    }, duration + transitionDuration);

    return () => {
      clearTimeout(startAnimationTimer);
      clearTimeout(hideComponentTimer);
    };
  }, [duration, transitionDuration]);

  return (
    <>
      {showSplash && (
        <div 
          className={`
            fixed inset-0 flex flex-col items-center justify-center z-50
            bg-white transition-all ease-out
            ${animateOut ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
          `}
          style={{ transitionDuration: `${transitionDuration}ms` }}
        >
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <Image
              src="/logo_kominfo.png"
              alt="Logo E-Agenda"
              width={150}
              height={150}
            />
            <h1 className="text-4xl font-extrabold text-blue-700">E - Agenda</h1>
            <p className="text-lg text-gray-600">Loading...</p>
            <LottieLoading
            />
          </div>
        </div>
      )}
      {/* Konten utama yang akan selalu dirender di belakang splash screen */}
      {children}
    </>
  );
};

export default SplashLoader;