// components/PreAgendaTable.tsx

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import PreAgendaRow from '@/component/PreAgendaRow';
import '@/app/AgendaTableAutoScroll.css';

// Menggunakan data dummy untuk contoh, Anda bisa menghubungkan ke API yang berbeda
interface ApiAgendaItem {
  nama_kegiatan: string;
  tanggal_kegiatan: string;
  jam_mulai: string;
  lokasi_kegiatan: string;
  pelaksana: string;
}

const API_URL = 'https://e-agenda.hstkab.go.id/api/agendas/public/daily/global'; // Ganti dengan URL API kedua Anda
const RAW_TOKEN = 'your-secure-api-token-here-change-in-production';

const PreAgendaTable = () => {
  const headers = ['Kegiatan', 'Hari/Tanggal', 'Waktu', 'Tempat', 'Pelaksana'];
  const [allAgendaData, setAllAgendaData] = useState<ApiAgendaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgendaData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: RAW_TOKEN }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        const dataArray = result;

        if (!Array.isArray(dataArray)) {
          throw new Error("API response is not an array");
        }
        setAllAgendaData(dataArray);
        setError(null);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgendaData();
    const intervalId = setInterval(fetchAgendaData, 20000);
    return () => clearInterval(intervalId);
  }, []);

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const loopableRender = useMemo(() => {
    const renderableElements = Object.keys(allAgendaData).flatMap(date => {
    //   const dateHeader = (
    //     <div key={`header-${date}`} className="bg-blue-200 text-blue-800 font-semibold text-center py-2 px-4 rounded-md mb-2 mt-4">
    //       {new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    //     </div>
    //   );
      const agendaRows = allAgendaData.map((agenda, index) => (
        <PreAgendaRow 
        key={`${agenda.nama_kegiatan}-${index}`} 
        kegiatan={agenda.nama_kegiatan}
        tanggal={getFormattedDate(agenda.tanggal_kegiatan)}
        waktu={agenda.jam_mulai} 
        tempat={agenda.lokasi_kegiatan}
        pelaksana={agenda.pelaksana} />
      ));
      return [agendaRows];
    });
    return [...renderableElements, ...renderableElements, ...renderableElements, ...renderableElements];
  }, [allAgendaData]);

  if (isLoading) {
    return (
      <div className="bg-white p-2 rounded-2xl text-blue-950 shadow-xl mt-2 border-r-8 border-blue-400">
        <div className='bg-blue-200 rounded-xl text-blue-800 font-semibold text-center py-2 px-4 rounded-md mb-2 '>
          Agenda
        </div>

      <div className="grid grid-cols-5 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
        {headers.map((header) => (
          <div key={header} className="text-sm md:text-base text-center">{header}</div>
        ))}
      </div>

      <div className="text-center p-4 text-gray-500 animate-pulse">
        Sedang memuat data agenda...
      </div>
    </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white p-2 rounded-2xl text-blue-950 shadow-xl mt-2 border-r-8 border-blue-400">
        <div className='bg-blue-200 rounded-xl text-blue-800 font-semibold text-center py-2 px-4 rounded-md mb-2 '>
          Agenda
        </div>

      <div className="grid grid-cols-5 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
        {headers.map((header) => (
          <div key={header} className="text-sm md:text-base text-center">{header}</div>
        ))}
      </div>

      <div className="text-center p-4 text-red-500">
        Terjadi kesalahan saat memuat data: {error}
      </div>
    </div>
    );
  }
  if (Object.keys(allAgendaData).length === 0) {
    return (
    <div className="bg-white p-2 rounded-2xl text-blue-950 shadow-xl mt-2 border-r-8 border-blue-400">
      <div className='bg-blue-200 rounded-xl text-blue-800 font-semibold text-center py-2 px-4 rounded-md mb-2 '>
          Agenda
        </div>

      <div className="grid grid-cols-5 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
        {headers.map((header) => (
          <div key={header} className="text-sm md:text-base text-center">{header}</div>
        ))}
      </div>

      <div className="text-center p-4 text-gray-500 flex flex-col items-center justify-center space-y-4">
        {/* ICON AGENDA (Kalender dengan Jam) */}
        <svg 
          className="h-20 w-20 text-blue-450" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <circle cx="17" cy="17" r="3"></circle>
          <path d="M17 15v2l1 1"></path>
        </svg>
        <p className='text-blue-450'>Tidak ada data agenda pada hari ini.</p>
      </div>
    </div>
    )
  }
  return (
    <div className="bg-white p-2 rounded-2xl shadow-xl mt-2 flex flex-col border-r-8 border-blue-400">
      <div className='bg-blue-200 rounded-xl text-blue-800 font-semibold text-center py-2 px-4 rounded-md mb-2 '>
          Agenda
        </div>
        
      <div className="grid grid-cols-5 gap-4 p-2 font-bold text-white bg-blue-950 rounded-xl flex-shrink-0">
        {headers.map(header => <div key={header} className="text-sm md:text-base text-center">{header}</div>)}
      </div>
      
      <div className="agenda-scroll-container mt-2 border border-gray-200 rounded-lg overflow-hidden">
        <div className="agenda-scroll-prelist">
          {loopableRender.map((element, index) => <React.Fragment key={index}>{element}</React.Fragment>)}
        </div>
      </div>
    </div>
  );
};

export default PreAgendaTable;