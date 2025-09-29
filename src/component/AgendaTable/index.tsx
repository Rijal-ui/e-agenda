// components/AgendaTable.tsx

"use client"; // Tambahkan baris ini

import React, { useEffect, useMemo, useState } from 'react';
import AgendaRow from '@/component/AgendaRow';
import '@/app/AgendaTableAutoScroll.css';
import { da } from 'date-fns/locale';

interface ApiAgendaItem {
  user_rel: UserRel;
  tanggal_kegiatan: string;
  nama_kegiatan: string;
  lokasi_kegiatan: string;
  jam_mulai: string;
  jam_selesai: string;
  status_kegiatan: string;
}

interface UserRel {
  nama: string,
}

const API_URL = 'https://e-agenda.hstkab.go.id/api/agendas/public/daily';
const RAW_TOKEN = 'your-secure-api-token-here-change-in-production';

const AgendaTable = () => {
  const headers = ['Nama', 'Kegiatan', 'Lokasi', 'Jam Mulai', 'Jam Selesai', 'Status'];

  const [agendaData, setAgendaData] = useState<ApiAgendaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fecthAgendaData = async () => {
      try {
        const finalUrl = `${API_URL}`;

        const response = await fetch(finalUrl, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            token: RAW_TOKEN,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        console.log(response);
        const result = await response.json();
        const dataArray = result;

        if (!Array.isArray(dataArray)) {
          throw new Error("API response is not an array");
        }

        setAgendaData(dataArray);
        setError(null);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fecthAgendaData();

    // Set interval untuk fetch data setiap 30 detik (30000ms)
    const intervalId = setInterval(fecthAgendaData, 20000);

    // Fungsi cleanup untuk menghentikan interval saat komponen dilepas
    return () => clearInterval(intervalId);
  }, []);

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  // Mengelompokkan data tanpa filter
  const groupedDate = useMemo(() => {
    return agendaData.reduce((groups, item) => {
      const date = item.tanggal_kegiatan;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {} as Record<string, ApiAgendaItem[]>);
  }, [agendaData]);

  const loopableRender = useMemo(() => {
    const renderableElements = Object.keys(groupedDate).flatMap(date => {
      const dateHeader = (
        <div 
          key={`header-${date}`} 
          className="bg-blue-200 text-blue-800 font-semibold text-center py-2 px-4 rounded-md mb-2 mt-4">
          {getFormattedDate(date)}
        </div>
      );
      const agendaRows = groupedDate[date].map((agenda, index) => (
        <AgendaRow
          key={`${agenda.user_rel.nama}-${date}-${index}`}
          user_rel={agenda.user_rel.nama}
          kegiatan={agenda.nama_kegiatan}
          lokasi={agenda.lokasi_kegiatan}
          jamMulai={agenda.jam_mulai}
          jamSelesai={agenda.jam_selesai}
          status={agenda.status_kegiatan}
        />
      ));
      return [dateHeader, ...agendaRows];
    });

    return [...renderableElements, ...renderableElements, ...renderableElements, ...renderableElements];
  }, [groupedDate]);

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-2xl text-blue-950 shadow-xl mt-4 border-r-8 border-blue-400">
        <div className='bg-blue-200 rounded-xl text-blue-800 font-semibold text-center py-2 px-4 rounded-md mb-2 '>
          Kegiatan
        </div>

      <div className="grid grid-cols-6 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
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
      <div className="bg-white p-4 rounded-2xl text-blue-950 shadow-xl mt-4 border-r-8 border-blue-400">
        <div className='bg-blue-200 rounded-xl text-blue-800 font-semibold text-center py-2 px-4 rounded-md mb-2 '>
          Kegiatan
        </div>

      <div className="grid grid-cols-6 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
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

  if (Object.keys(groupedDate).length === 0) {
    return (
    <div className="bg-white p-4 rounded-2xl text-blue-950 shadow-xl mt-4 border-r-8 border-blue-400">
      <div className='bg-blue-200 rounded-xl text-blue-800 font-semibold text-center py-2 px-4 rounded-md mb-2 '>
          Kegiatan
        </div>

      <div className="grid grid-cols-6 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
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
    <div className="bg-white p-2 rounded-2xl text-blue-950 shadow-xl border-r-8 border-blue-400">
      <div className='bg-blue-200 rounded-xl text-blue-800 font-semibold text-center py-2 px-4 rounded-md mb-2 '>
          Kegiatan
        </div>

      <div className="grid grid-cols-6 gap-4 p-2 font-bold text-white bg-blue-950 rounded-xl">
        {headers.map((header) => (
          <div key={header} className="text-sm md:text-base text-center">{header}</div>
        ))}
      </div>

     <div className="agenda-scroll-container mt-2 border border-gray-200 rounded-lg overflow-hidden">
        <div className="agenda-scroll-list">
           {loopableRender.map((element, index) => (
            <React.Fragment key={index}>
              {element}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgendaTable;