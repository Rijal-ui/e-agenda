// app/page.js

import React from 'react';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import AgendaTable from '@/component/AgendaTable';
import PreAgendaTable from '@/component/PreAgendaTable'
import PresenceList from '@/component/PresenceList';
import SplashLoader from '@/component/SplashLoader';
import RotateDeviceWarning from '@/component/RotateDeviceWarning';

export default function Home() {
  return (
    <>
      <RotateDeviceWarning />
      <SplashLoader duration={5000}>
        <div className="bg-blue-950 min-h-screen p-4 flex flex-col">
          <div className="w-full">
            <Header />
          </div>

          <div className="w-full flex-grow mt-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kontainer untuk dua tabel agenda (posisi atas-bawah) */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {/* Tabel Agenda Pertama */}
              <div className="flex-1">
                <PreAgendaTable />
              </div>
              {/* Tabel Agenda Kedua */}
              <div className="flex-1">
                <AgendaTable />
              </div>
            </div>
            
            {/* Tabel Kehadiran (posisi samping kanan) */}
            <div className="md:col-span-1 flex flex-col">
              <PresenceList />
            </div>
          </div>
          <Footer />
        </div>
      </SplashLoader>
    </>
  );
}