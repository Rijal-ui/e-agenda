'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QrTokenResponse {
  data?: {
    createAttendanceQrToken?: {
      token: string;
      instansi_id: string;
    };
  };
}

const AttendanceQR: React.FC = () => {
  const [qrToken, setQrToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(15); // State untuk detik

  const fetchToken = useCallback(async () => {
    setLoading(true);
    try {
      const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOiI2YTAyOTU1Yi1jYjIzLTQzNjAtOGI5NS1jMTljNjZkNDhkNWIifSwiaWF0IjoxNzczMjExODExLCJleHAiOjE3OTA0OTE4MTF9.0xYTXmynwFI6si4D2-jTsYgb6HN6c0KCmi-Ufk5nB3k"; 
      const res = await fetch('/api/attendance/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
      });

      const jsonData: QrTokenResponse = await res.json();
      if (jsonData.data?.createAttendanceQrToken) {
        setQrToken(jsonData.data.createAttendanceQrToken.token);
        setCountdown(15); // Reset hitung mundur ke 15 setelah token baru didapat
      }
    } catch (err) {
      console.error("Failed to fetch QR Token:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect 1: Menangani pengambilan token baru setiap 15 detik
  useEffect(() => {
    fetchToken();
    const intervalId = setInterval(fetchToken, 15000);
    return () => clearInterval(intervalId);
  }, [fetchToken]);

  // Effect 2: Menangani visual hitung mundur (per detik)
  useEffect(() => {
    if (countdown <= 0) return;

    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdown]);

  const getQrValue = (): string => {
    if (!qrToken) return "";
    return JSON.stringify({
      token: qrToken,
      valid_until: new Date(Date.now() + (countdown * 1000)).toISOString() 
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-7">
        <h3 className="text-white font-bold text-sm mb-2 uppercase tracking-wider text-center">
            Scan Presensi PPPK Paruh Waktu & Tenaga Outsourcing
        </h3>
      {/* Container QR */}
      <div className="relative p-3 bg-white rounded-2xl shadow-xl border-4 border-blue-100 transition-all duration-500">
        {qrToken ? (
          <QRCodeCanvas 
            value={getQrValue()} 
            size={200} 
            level="H"
            includeMargin={false}
          />
        ) : (
          <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
             <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Overlay Loading saat refresh di detik ke-0 */}
        {loading && qrToken && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-xl backdrop-blur-[1px]">
             <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Tampilan Countdown */}
      <div className="mt-6 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-white font-mono font-bold text-lg border-2 border-blue-400 shadow-lg">
            {countdown}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-blue-200 uppercase font-bold tracking-widest">
              Refresh Otomatis
            </span>
            <div className="w-32 h-1.5 bg-blue-900 rounded-full mt-1 overflow-hidden">
              {/* Progress Bar Progress */}
              <div 
                className="h-full bg-blue-400 transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 15) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceQR;