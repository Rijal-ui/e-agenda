// components/AgendaRow.tsx

import React from 'react';

// Mendefinisikan tipe data untuk props AgendaRow
interface AgendaRowProps {
  user_rel : string;
  kegiatan: string;
  lokasi: string;
  jamMulai: string;
  jamSelesai: string;
  status: string;
}

const AgendaRow = ({ user_rel, kegiatan, lokasi, jamMulai, jamSelesai, status }: AgendaRowProps) => {
  return (
    <div className="grid grid-cols-6 gap-4 p-4 text-gray-800 bg-gray-50 hover:bg-blue-100 transition-colors duration-400 transform hover:scale-105">
      <div className="text-center text-sm font-bold">{user_rel}</div>
      <div className="text-justify">{kegiatan}</div>
      <div className="text-center">{lokasi}</div>
      <div className="text-center">{jamMulai}</div>
      <div className="text-center">{jamSelesai}</div>
      <div className={`text-center font-semibold
        ${status === 'Completed' ? 'text-green-600' : 'text-gray-500'}
        ${status === 'In Progress' ? 'text-yellow-600' : 'text-gray-500'}
        ${status === 'Scheduled' ? 'text-blue-200' : 'text-gray-500'}
        ${status === 'Cancelled' ? 'text-red-600' : 'text-gray-500'}
        ${status === 'Pending' ? 'text-yellow-600' : 'text-gray-500'}
        `}>
        {status}
      </div>
    </div>
  );
};

export default AgendaRow;