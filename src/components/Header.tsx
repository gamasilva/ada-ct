import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);



  const navLinks = [
    { label: 'Início', href: '/#home' },
    { label: 'Sobre', href: '/#quem-somos' },
    { label: 'Cãoleria', href: '/#dog-gallery' },
    { label: 'Serviços', href: '/#servicos' },
    { label: 'Estrutura', href: '/#estrutura' },
    { label: 'Regras', href: '/#regras' },
    { label: 'Dúvidas', href: '/#faq' },
    { label: 'Contato', href: '/#contato' }
  ];

  return (
    <header className="fixed w-full z-50 shadow-xl top-0 transition-all duration-300 border-b-2 border-yellow-400/40">
      {/* Background with Texture */}
      <div
        className="absolute inset-0 bg-green-700"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm10-20c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10 10-10-4.477-10-10z' fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <picture>
              <img
                src="/logo-48.webp"
                srcSet="/logo-48.webp 1x, /logo-96.webp 2x"
                alt="RK9 Logo"
                width={48}
                height={48}
                loading="eager"
                fetchPriority="high"
                className="h-12 w-auto rounded-full shadow-lg shadow-yellow-500/50 hover:scale-105 transition-all duration-300 hover:shadow-yellow-500/80 border-2 border-yellow-500/30"
              />
            </picture>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-bold text-white hover:text-yellow-400 transition-all uppercase tracking-wide hover:scale-105 py-3 px-2 rounded-lg" // Added padding for touch target
              >
                {item.label}
              </a>
            ))}
            <a
              href="/reservas"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-full font-bold transition-all hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 ml-4"
            >
              Reservar Agora
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:bg-green-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>


      </div>

      {/* Mobile Nav - Full Width Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-0 w-full bg-green-800 shadow-2xl border-t border-white/10 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white font-bold text-lg p-4 hover:bg-green-700/50 rounded-xl block border-b border-white/5 last:border-0 hover:text-yellow-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="/reservas"
                onClick={() => setIsOpen(false)}
                className="bg-yellow-500 text-gray-900 text-center py-4 rounded-xl font-black text-lg shadow-md hover:bg-yellow-400 transition-colors mt-4"
              >
                Reservar Agora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
