'use client';

import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-white/5 mt-12 bg-surface/20 relative overflow-hidden">
      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[15vw] font-black italic tracking-tighter uppercase whitespace-nowrap">
          GOLAZO
        </span>
      </div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Main Logo Text */}
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl font-black italic uppercase tracking-tighter text-white"
        >
          GOLAZO
        </motion.h3>

        {/* Links and Copyright */}
        <div className="w-full space-y-6 text-center">
          <div className="flex justify-center gap-4 text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">
            <button className="hover:text-brand transition-colors">Términos</button>
            <button className="hover:text-brand transition-colors">Privacidad</button>
            <button className="hover:text-brand transition-colors">Soporte</button>
          </div>
          
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-700">
            © 2024 NOCTURNAL VELOCITY SYSTEM
          </p>
        </div>
      </div>
    </footer>
  );
}
