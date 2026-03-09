'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PresenceList from '../PresenceList';
import PresencePermissionList from '../PresencePermissionList';

const FlippingPresence = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="presence"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <PresenceList />
          </motion.div>
        ) : (
          <motion.div
            key="permission"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <PresencePermissionList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlippingPresence;