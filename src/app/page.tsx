// app/page.js

import React from 'react';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import AgendaTable from '@/component/AgendaTable';
import PresenceList from '@/component/PresenceList';
import SplashLoader from '@/component/SplashLoader';

export default function Home() {
  return (
    <SplashLoader duration={5000}>
      <div className="bg-blue-950 min-h-screen p-6">
        <div className="max-w-9xl mx-auto">
          <Header />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
            <div className="md:col-span-2">
              <AgendaTable />
            </div>
            <div className="md:col-span-1">
              <PresenceList />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SplashLoader>
  );
}