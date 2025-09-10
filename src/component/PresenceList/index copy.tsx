// components/PresenceList.tsx

import React from 'react';
import PresenceCard from '@/component/PresenceCard';
import '@/app/PresenceList.css'

const PresenceList = () => {
  const presenceData = [
    { nama: 'YUSOF ZAKY, S.Kom', jam: '07:56:09', keterangan: 'Absen Masuk' },
    { nama: 'ZAINAL ARIFIN, A.Md', jam: '07:52:49', keterangan: 'Absen Masuk' },
    { nama: 'BAMBANG S., S.E', jam: '08:15:30', keterangan: 'Absen Masuk' },
    { nama: 'ANITA WULAN, M.Pd', jam: '08:18:00', keterangan: 'Absen Masuk' },
    { nama: 'KHAIRUL ANWAR, A.Md', jam: '08:21:45', keterangan: 'Absen Masuk' },
    { nama: 'DIAN PRATIWI, S.T', jam: '08:25:10', keterangan: 'Absen Masuk' },
    { nama: 'DIAN PRATIWI, S.T', jam: '16:01:14', keterangan: 'Absen Pulang' },
  ];

  // Menggandakan data agar scrolling terlihat mulus
  const doubledPresenceData = [...presenceData, ...presenceData];

  return (
    <div className="space-y-4 mt-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-l-8 border-blue-400">
        <h2 className="text-xl font-bold text-gray-800">Daftar Kehadiran Hari Ini</h2>
        <p className="text-gray-500 text-sm">Status terbaru</p>
      </div>

      <div className="scroll-container bg-white rounded-xl p-4 shadow-xl border-l-8 border-blue-400">
        <div className="scroll-list space-y-4">
          {doubledPresenceData.map((data, index) => (
            <PresenceCard
              key={index} // Gunakan index sebagai key, tapi hati-hati pada list dinamis
              nama={data.nama}
              jam={data.jam}
              keterangan={data.keterangan}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresenceList;