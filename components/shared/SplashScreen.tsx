'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useAppContext } from '@/lib/context';

export default function SplashScreen() {
  const { hasSeenSplash, setHasSeenSplash } = useAppContext();

  useEffect(() => {
    if (!hasSeenSplash) {
      const timer = setTimeout(() => {
        setHasSeenSplash(true);
      }, 2000); // 2 seconds splash screen
      return () => clearTimeout(timer);
    }
  }, [hasSeenSplash, setHasSeenSplash]);

  return (
    <AnimatePresence>
      {!hasSeenSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 text-center"
          >
            <h1 className="text-6xl sm:text-8xl font-black italic tracking-tighter uppercase text-brand drop-shadow-[0_0_30px_rgba(0,230,118,0.4)]">
              GOLAZO
            </h1>
            <div className="w-12 h-1 bg-brand mx-auto rounded-full" />
            <p className="text-gray-400 font-bold text-xs sm:text-sm uppercase tracking-widest">
              Tu próximo partido, a un toque de distancia
            </p>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-12 text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="w-4 h-4 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-2">
              <div className="w-2 h-2 rounded-full bg-brand animate-ping" />
            </div>
            <p className="text-[8px] font-black text-gray-600 tracking-[0.3em] uppercase">POWERED BY VELOCITY</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
