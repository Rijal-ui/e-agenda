// components/PresenceCard.tsx

import React from 'react';

interface PresenceCardProps {
  nama: string;
  jam: string;
  keterangan: string;
}

const PresenceCard = ({ nama, jam, keterangan }: PresenceCardProps) => {
  const isMasuk = keterangan === 'Absen Masuk';
  const cardColor = 'bg-green-50'; // Contoh warna berbeda

  return (
    <div className={`p-6 rounded-2xl shadow-md border-l-4 border-green-500 transition-all duration-300 transform hover:scale-105 ${cardColor}`}>
      <div className="flex items-center space-x-3 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isMasuk ? 'text-green-500' : 'text-yellow-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <p className="font-bold text-gray-800 text-sm">Nama:</p>
      </div>
      <p className="text-blue-600 text-sm font-bold ml-8 -mt-3">{nama}</p>
      
      <div className="flex items-center space-x-3 mt-1 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-bold text-gray-800 text-sm">Jam:</p>
      </div>
      <p className="text-gray-700 text-sm ml-8 -mt-3">{jam}</p>
      
      <div className="flex items-center space-x-3 mt-1 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isMasuk ? 'text-green-500' : 'text-yellow-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.01 12.01 0 002.944 12c.381 4.54 3.504 8.224 7.614 9.465a11.955 11.955 0 011.492 0c4.11-1.241 7.233-4.925 7.614-9.465a12.01 12.01 0 00-2.094-7.962z" />
        </svg>
        <p className="font-bold text-gray-800 text-sm">Keterangan:</p>
      </div>
      <p className={`font-bold text-sm ml-8 -mt-3 ${isMasuk ? 'text-green-600' : 'text-yellow-600'}`}>{keterangan}</p>
    </div>
  );
};

export default PresenceCard;