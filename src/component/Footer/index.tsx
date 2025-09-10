// components/Footer.tsx

import React from 'react';
import Image from 'next/image'; // Import komponen Image dari Next.js

const Footer = () => {
  return (
        <p className="text-white mt-1 text-sm md:text-base flex items-center justify-center space-x-1">
            <span>&copy;</span>
            <span>2025 Diskominfo HST</span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span>E-Agenda</span>
        </p>
  );
};

export default Footer;