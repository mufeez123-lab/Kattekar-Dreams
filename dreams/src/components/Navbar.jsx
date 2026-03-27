import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect for a glassmorphism look
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 px-6 py-2 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand / Logo */}
        <div className="group cursor-pointer">
        <img src="/images/logo.png" alt="" className='h-20' />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {['Portfolio', 'Services', 'Gallery', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          
          {/* CTA Button */}
         <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-yellow-500 hover:text-white transition-all transform hover:scale-105 shadow-lg">
  <MapPin size={18} className="text-yellow-500 group-hover:text-white transition-colors" />
  LOCATION
</button>
        </div>

        {/* Mobile Menu Icon (Placeholder) */}
        <div className="md:hidden text-white cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;