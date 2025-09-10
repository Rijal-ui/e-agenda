// components/AgendaTable.tsx

"use client"; // Tambahkan baris ini

import React, { useMemo, useState } from 'react';
import AgendaRow from '@/component/AgendaRow';
import '@/app/AgendaTableAutoScroll.css';

const AgendaTable = () => {
  const headers = ['Nama', 'Kegiatan', 'Lokasi', 'Jam Mulai', 'Jam Selesai', 'Status'];

  // Data agenda yang telah dipisahkan
  const allAgendaData = [
    { nama: 'John Doe', kegiatan: 'Rapat Anggaran', lokasi: 'Ruang A', jamMulai: '09:00', jamSelesai: '11:00', status: 'Aktif' },
    { nama: 'Jane Smith', kegiatan: 'Diskusi Proyek', lokasi: 'Ruang B', jamMulai: '11:30', jamSelesai: '12:30', status: 'Aktif' },
    { nama: 'Peter Pan', kegiatan: 'Pelatihan Pegawai', lokasi: 'Auditorium', jamMulai: '13:00', jamSelesai: '15:00', status: 'Selesai' },
    { nama: 'Bambang S', kegiatan: 'Rapat Tim', lokasi: 'Ruang C', jamMulai: '15:30', jamSelesai: '16:30', status: 'Aktif' },
    { nama: 'Siti K', kegiatan: 'Presentasi Progres', lokasi: 'Ruang D', jamMulai: '10:00', jamSelesai: '11:00', status: 'Aktif' },
    { nama: 'Roni A', kegiatan: 'Interview Karyawan', lokasi: 'Ruang E', jamMulai: '14:00', jamSelesai: '15:00', status: 'Selesai' },
    { nama: 'Wulan A', kegiatan: 'Evaluasi Tahunan', lokasi: 'Ruang F', jamMulai: '08:00', jamSelesai: '09:00', status: 'Aktif' },
    { nama: 'Fajar S', kegiatan: 'Workshop Desain', lokasi: 'Ruang G', jamMulai: '16:00', jamSelesai: '17:00', status: 'Aktif' },
    { nama: 'Gilang R', kegiatan: 'Penyusunan Laporan', lokasi: 'Ruang H', jamMulai: '09:30', jamSelesai: '10:30', status: 'Selesai' },
    { nama: 'Hadi W', kegiatan: 'Briefing Pagi', lokasi: 'Ruang I', jamMulai: '08:30', jamSelesai: '09:00', status: 'Aktif' },
    { nama: 'Dewi S', kegiatan: 'Rapat Lintas Divisi', lokasi: 'Ruang J', jamMulai: '10:00', jamSelesai: '11:00', status: 'Aktif' },
    { nama: 'Yusuf Z', kegiatan: 'Diskusi Anggaran', lokasi: 'Ruang K', jamMulai: '11:00', jamSelesai: '12:00', status: 'Selesai' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

   // Filter data berdasarkan kata kunci pencarian
  const filteredData = useMemo(() => {
    const filtered = allAgendaData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    // Menggandakan data untuk membuat efek looping
    return [...filtered, ...filtered];
  }, [allAgendaData, searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-white p-8 rounded-2xl text-blue-950 shadow-xl mt-4 border-r-8 border-blue-400">
      {/* Formulir Pencarian dengan Ikon */}
     

      <div className="grid grid-cols-6 gap-4 p-4 font-bold text-white bg-blue-950 rounded-xl">
        {headers.map((header) => (
          <div key={header} className="text-sm md:text-base text-center">{header}</div>
        ))}
      </div>
      
      <div className="agenda-scroll-container mt-4 border border-gray-200 rounded-lg overflow-hidden">
        <div className="agenda-scroll-list">
        {filteredData.map((agenda, index) => (
          <AgendaRow
            key={index}
            nama={agenda.nama}
            kegiatan={agenda.kegiatan}
            lokasi={agenda.lokasi}
            jamMulai={agenda.jamMulai}
            jamSelesai={agenda.jamSelesai}
            status={agenda.status}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default AgendaTable;