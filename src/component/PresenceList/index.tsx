// components/PresenceList.tsx

'use client';

import React, { useEffect, useState } from 'react';
import PresenceCard from '@/component/PresenceCard';
import '@/app/PresenceList.css'
import { format } from 'date-fns';

// Mendefinisikan tipe data yang diharapkan dari API
// Sesuaikan dengan struktur data yang sebenarnya dari API Anda
interface ApiPresenceItem {
  nama: string;
  checktime: string;
  keterangan_absen: string;
}

const API_URL = 'https://e-agenda.hstkab.go.id/api/agendas/public/attendance';
const RAW_TOKEN = 'your-secure-api-token-here-change-in-production';

const date = Date.now();
const yearMonth = format(date, 'yyyyMM');
const today = format(date, 'yyyy-MM-dd');


const PresenceList = () => {
  const [presenceData, setPresenceData] = useState<ApiPresenceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresenceData = async () => {
      try {
        // Mendefinisikan query parameters yang akan dikirim
        const queryParams = {
          deptid: '13',
          periode: yearMonth,
          start_date: today,
          end_date: today,
        };

        const queryString = new URLSearchParams(queryParams).toString();
        const finalUrl = `${API_URL}?${queryString}`;

        const response = await fetch(finalUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Token dan data lain di dalam body
            token: RAW_TOKEN,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Asumsikan respons API adalah objek dengan properti 'data' yang berisi array
        const result = await response.json();
        const dataArray = result.data; // Ganti '.data' sesuai properti API Anda

        if (!Array.isArray(dataArray)) {
          throw new Error("API response is not an array");
        }

        setPresenceData(dataArray);
        setError(null); // Menghapus error jika sebelumnya ada
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPresenceData();

    // Set interval untuk fetch data setiap 30 detik (30000ms)
    const intervalId = setInterval(fetchPresenceData, 20000);

    // Fungsi cleanup untuk menghentikan interval saat komponen dilepas
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 mt-2">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-l-8 border-blue-400">
        <h2 className="text-xl font-bold text-gray-800">Daftar Kehadiran</h2>
        <p className="text-gray-500 text-sm">Status terbaru</p>
      </div>

      <div className="scroll-container bg-white rounded-xl p-4 shadow-xl border-l-8 border-blue-400">
        <div className="text-center p-8 text-gray-500 animate-pulse">
        Sedang memuat data kehadiran...
        </div>
      </div>
    </div>
    );
  }

  if (error) {
    return (
    <div className="space-y-4 mt-2">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-l-8 border-blue-400">
        <h2 className="text-xl font-bold text-gray-800">Daftar Kehadiran</h2>
        <p className="text-gray-500 text-sm">Status terbaru</p>
      </div>

      <div className="scroll-container bg-white rounded-xl p-4 shadow-xl border-l-8 border-blue-400">
        <div className="text-center p-8 text-red-500">
        Terjadi kesalahan saat memuat data: {error}
        </div>
      </div>
    </div>
    );
  }

  // Menggandakan data untuk efek looping
  const loopableData = [...presenceData, ...presenceData];

  if (presenceData.length === 0) {
    return (
    <div className="space-y-4 mt-2">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-l-8 border-blue-400">
        <h2 className="text-xl font-bold text-gray-800">Daftar Kehadiran</h2>
        <p className="text-gray-500 text-sm">Status terbaru</p>
      </div>

      <div className="scroll-container bg-white rounded-xl p-4 shadow-xl border-l-8 border-blue-400">
        <div className="text-center p-8 text-gray-500">
        Tidak ada data kehadiran yang ditemukan.
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="space-y-4 mt-2">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-l-8 border-blue-400">
        <h2 className="text-xl font-bold text-gray-800">Daftar Kehadiran</h2>
        <p className="text-gray-500 text-sm">Status terbaru</p>
      </div>

      <div className="scroll-container bg-white rounded-xl p-4 shadow-xl border-l-8 border-blue-400">
        <div className="scroll-list space-y-4">
          {loopableData.map((item, index) => (
            <PresenceCard
              key={index}
              nama={item.nama}
              jam={item.checktime}
              keterangan={item.keterangan_absen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresenceList;