import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 px-6 py-4 ${
      isScrolled ? 'bg-black/60 backdrop-blur-xl ' : 'bg-transparent'
    }`}>
      {/* 
        Container setup: 
        - justify-center keeps the logo in the middle.
        - items-center keeps the button aligned.
      */}
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        
        {/* Invisible spacer to perfectly balance the button on the right */}
        <div className="hidden md:block w-[140px]"></div>

        {/* CENTERED LOGO with Fade-In Animation */}
        <div className="animate-fade-in-slow ">
         <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter ">
              Kattekar<span className="text-[#e8d574] px-3">Dreams</span>
            </h2>
            <div className="flex items-center justify-center">

    <span className="text-[10px] font-black tracking-[0.5em] text-gray-400 uppercase italic">
      Mens Outlet
    </span>
  </div>
        </div>

        {/* RIGHT SIDE: Location CTA */}
        <div className="animate-fade-in-right">
       <a 
  href="https://maps.app.goo.gl/tEDquNDp6RTT7V978"
  target="_blank" 
  rel="noopener noreferrer"
  className="no-underline"
>
  <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-[10px] md:text-xs font-black tracking-widest hover:bg-yellow-500 hover:text-white transition-all transform hover:scale-105 shadow-xl uppercase group">
    <MapPin 
      size={14} 
      className="text-[#e8d574] group-hover:text-white transition-colors" 
    />
    <span className="hidden sm:inline">Location</span>
  </button>
</a>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.2s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 1s cubic-bezier(0.2, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;