// components/AgendaTable.tsx

"use client"; // Tambahkan baris ini

import React, { useEffect, useMemo, useState } from 'react';
import AgendaRow from '@/component/AgendaRow';
import '@/app/AgendaTableAutoScroll.css';

interface ApiAgendaItem {
  user_rel: UserRel;
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
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fecthAgendaData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-2xl text-blue-950 shadow-xl mt-4 border-r-8 border-blue-400">

      <div className="grid grid-cols-6 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
        {headers.map((header) => (
          <div key={header} className="text-sm md:text-base text-center">{header}</div>
        ))}
      </div>

      <div className="text-center p-8 text-gray-500 animate-pulse">
        Sedang memuat data agenda...
      </div>
    </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-2xl text-blue-950 shadow-xl mt-4 border-r-8 border-blue-400">

      <div className="grid grid-cols-6 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
        {headers.map((header) => (
          <div key={header} className="text-sm md:text-base text-center">{header}</div>
        ))}
      </div>

      <div className="text-center p-8 text-red-500">
        Terjadi kesalahan saat memuat data: {error}
      </div>
    </div>
    );
  }

  const loopableData = [...agendaData, ...agendaData, ...agendaData, ...agendaData]

  if (agendaData.length === 0) {
    <div className="bg-white p-8 rounded-2xl text-blue-950 shadow-xl mt-4 border-r-8 border-blue-400">

      <div className="grid grid-cols-6 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
        {headers.map((header) => (
          <div key={header} className="text-sm md:text-base text-center">{header}</div>
        ))}
      </div>

       <div className="text-center p-8 text-gray-500">
        Tidak ada data agenda pada hari ini.
        </div>
    </div>
  }

  return (
    <div className="bg-white p-8 rounded-2xl text-blue-950 shadow-xl mt-4 border-r-8 border-blue-400">

      <div className="grid grid-cols-6 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
        {headers.map((header) => (
          <div key={header} className="text-sm md:text-base text-center">{header}</div>
        ))}
      </div>

     <div className="agenda-scroll-container mt-4 border border-gray-200 rounded-lg overflow-hidden">
        <div className="agenda-scroll-list">
        {loopableData.map((agenda, index) => (
          <AgendaRow
            key={index}
            user_rel={agenda.user_rel.nama}
            kegiatan={agenda.nama_kegiatan}
            lokasi={agenda.lokasi_kegiatan}
            jamMulai={agenda.jam_mulai}
            jamSelesai={agenda.jam_selesai}
            status={agenda.status_kegiatan}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default AgendaTable;