// app/page.js

import Header from '@/component/Header';
import Footer from '@/component/Footer';
import AgendaTable from '@/component/AgendaTable';
import PreAgendaTable from '@/component/PreAgendaTable'
import SplashLoader from '@/component/SplashLoader';
import RotateDeviceWarning from '@/component/RotateDeviceWarning';
import QrAttendance from '@/component/QrAttendace'
import FlippingPresence from '@/component/FlippingPresence';

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
            <div className="md:col-span-2 flex flex-col gap-4 m-1">
              <div className="flex-1">
                <PreAgendaTable />
              </div>
              <div className="flex-1">
                <AgendaTable />
              </div>
            </div>
            
            <div className="md:col-span-1 flex flex-col gap-4">
              {/* QR Code tetap di atas */}
              <div className='h-auto'>
                <QrAttendance />
              </div>

              {/* Komponen Flip di sini */}
              <div className='flex-1 relative'>
                <FlippingPresence />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </SplashLoader>
    </>
  );
}