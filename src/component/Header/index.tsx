// components/Header.tsx

"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const API_URL = 'https://e-agenda.hstkab.go.id/api/agendas/public/prayer-timings';
const RAW_TOKEN = 'your-secure-api-token-here-change-in-production';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
}

const PRAYER_LABELS: { key: keyof PrayerTimes; label: string; }[] = [
  { key: 'Imsak',   label: 'Imsak' },
  { key: 'Fajr',    label: 'Subuh' },
  { key: 'Sunrise', label: 'Syuruk' },
  { key: 'Dhuhr',   label: 'Dzuhur' },
  { key: 'Asr',     label: 'Ashar' },
  { key: 'Maghrib', label: 'Maghrib' },
  { key: 'Isha',    label: 'Isya' },
];

const Header = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: RAW_TOKEN }),
        });
        if (response.ok) {
          const data = await response.json();
          setPrayerTimes(data);
        }
      } catch {}
    };

    fetchPrayerTimes();
    const id = setInterval(fetchPrayerTimes, 300000);
    return () => clearInterval(id);
  }, []);

  const tickerItems = prayerTimes
    ? PRAYER_LABELS.map(({ key, label }) => (
        <span key={key} className="inline-flex items-center gap-1 mx-5 shrink-0">
          <span className="font-semibold text-blue-950 text-sm">{label}</span>
          <span className="text-blue-600 font-bold text-sm">{prayerTimes[key]}</span>
          <span className="text-gray-300 ml-4">|</span>
        </span>
      ))
    : null;

  return (
    <div className="bg-white px-4 py-2 rounded-2xl shadow-lg border-b-6 border-blue-400 flex items-center gap-4">
      {/* Kiri: Logo + Judul (satu baris) */}
      <div className="flex items-center gap-3 shrink-0">
        <Image
          src="/logo_kominfo.png"
          alt="Logo Dinas Komunikasi dan Informatika"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="leading-tight">
          <h1 className="text-2xl font-extrabold text-blue-950 whitespace-nowrap">si-Dinda</h1>
          <p className="text-blue-950 text-xs whitespace-nowrap">Dinas Komunikasi dan Informatika</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-blue-200 shrink-0" />

      {/* Tengah: Label + Ticker Jadwal Sholat satu baris */}
      <div className="flex-1 min-w-0 flex items-center gap-2 overflow-hidden">
        <span className="shrink-0 text-xs font-bold text-white bg-blue-950 px-2 py-1 rounded-lg whitespace-nowrap">
          🕌 Jadwal Sholat
        </span>
        <div className="overflow-hidden flex-1">
          <div className="prayer-ticker">
            {tickerItems}
            {tickerItems}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-blue-200 shrink-0" />

      {/* Kanan: Tombol Login */}
      <Link href="//e-agenda.hstkab.go.id">
        <button className="px-5 py-2 bg-blue-950 text-white font-bold rounded-2xl hover:bg-blue-400 hover:text-blue-950 transition-colors duration-200 shadow-md shrink-0 text-sm">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Header;
