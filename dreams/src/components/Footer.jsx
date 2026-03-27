import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-10 px-6 md:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Upper Section: CTA & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-6">
              Kattekar<span className="text-[#e8d574] px-2">Dreams</span>
            </h2>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-8">
Based in Sullya, delivering premium clothing with a focus on comfort, quality, and modern style.</p>
           <div className="flex items-center space-x-4">
  {/* Instagram Icon */}
  <a 
    href="https://www.instagram.com/kattekar_dreams/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="group transition-transform duration-300 hover:scale-110"
  >
    <img 
      src="/images/instagram.png" 
      alt="Instagram" 
      className="h-12 w-12 object-contain  transition-all filter  group-hover:grayscale-0" 
    />
  </a>

  {/* Separator */}
  <div className="h-4 w-[1px] bg-white/10"></div>

  {/* WhatsApp Icon */}
  <a 
    href="https://wa.me/917090038818" 
    target="_blank" 
    rel="noopener noreferrer"
    className="group transition-transform duration-300 hover:scale-110"
  >
    <img 
      src="/images/whatsapp.png" 
      alt="WhatsApp" 
      className="h-10 w-10 object-contain  transition-all filter " 
    />
  </a>
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#e8d574] font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
                     <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#clothing" className="hover:text-white transition-colors">Order Now</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
  <h4 className="text-[#e8d574] font-bold uppercase tracking-widest text-xs mb-6">Address</h4>
  <p className="text-sm text-gray-400 leading-relaxed italic">
   Kattekar building, <br /> Car St, Sullia,  Karnataka 574239
  </p>
  <a 
    href="https://maps.app.goo.gl/tEDquNDp6RTT7V978" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-[#e8d574] transition-colors mt-4 inline-block font-bold text-[10px] tracking-[0.3em] uppercase border-b border-white/10 pb-1"
  >
    View on Maps
  </a>
</div>

        </div>

        {/* Lower Section: Big Type & Bottom Info */}
        <div className="relative pt-24 mt-20 border-t border-white/5 flex flex-col items-center">
          
          {/* Large Background Text (Cinematic feel) */}
          <h1 className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 text-[10vw] font-black text-white/[0.06] uppercase italic select-none pointer-events-none whitespace-nowrap">
            KATTEKAR DREAMS
          </h1>

          <div className="flex flex-col md:flex-row justify-center w-full text-[10px] text-gray-500 uppercase tracking-[0.4em] gap-6">
            <p className="text-center md:text-left">© {currentYear} Kattekar Dreams. All Rights Reserved.</p>
         
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;