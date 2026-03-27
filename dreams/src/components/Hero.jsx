import React, { useState, useEffect } from 'react';

const EditorialHero = () => {
  // 1. Array of high-end fashion images
  const gallery = [
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=2070", // Main Portrait
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=2070", // Hoodie Detail
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=2070", // Close up Fabric
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
    }, 5000); // Changes every 5 seconds
    return () => clearInterval(timer);
  }, [gallery.length]);

  const handleScroll = (e) => {
    e.preventDefault();
    const element = document.getElementById('clothing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080808] flex flex-col lg:flex-row overflow-hidden">
      
      {/* LEFT SIDE: THE IDENTITY */}
      <div className="w-full lg:w-[55.5%] p-8 md:p-16 lg:p-24 flex flex-col justify-between relative z-20 bg-[#080808]">
        <div className="animate-fade-in">
          <p className="text-[#e8d574] text-[12px] font-black tracking-[0.5em] uppercase mb-2">
            Sullya  
          </p>
          <div className="h-[1px] w-12 bg-gray-800"></div>
        </div>

        <div className="mt-20 lg:mt-0">
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic mb-8">
         Kattekar<br /> 
            <span className="text-transparent stroke-text">Dreams</span> <br /> 
            <p className='text-xl tracking-wider'>Mens Outlet </p>
        
          </h1>
          
          <p className="text-gray-500 text-sm md:text-base max-w-sm leading-relaxed mb-10 animate-fade-in-delay">
           Kattekar Dreams introduces a bold clothing line. Premium fabrics, modern fits, and timeless streetwear designed for those who express themselves without limits.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-8 animate-fade-in-delay-2">
            <button 
              onClick={handleScroll}
              className="group relative px-12 py-5 bg-[#e8d574] text-black font-black text-[10px] tracking-[0.4em] uppercase transition-all hover:bg-white overflow-hidden"
            >
              <span className="relative text-[12px] z-10">Order Now</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            
            <div className="flex gap-4">
               <a href="https://wa.me/917090038818" className=" transition-opacity">
                  <img src="/images/whatsapp.png" alt="WhatsApp" className="h-8  w-8 " />
               </a>
               <a href="https://www.instagram.com/kattekar_dreams/" className=" transition-opacity">
                  <img src="/images/instagram.png" alt="Instagram" className="h-9 w-9 " />
               </a>
            </div>
          </div>
        </div>

        <div className="mt-20 lg:mt-0 pt-8 border-t border-white/5 flex justify-between items-end text-[9px] text-gray-700 tracking-widest leading-loose">
          <div>
       
            <p>© 2026 KATTEKAR DREAMS</p>
          </div>
          {/* Slide Indicator Dots */}
          <div className="flex gap-2 mb-2">
            {gallery.map((_, i) => (
              <div key={i} className={`h-1 transition-all duration-500 ${i === currentIndex ? 'w-8 bg-[#e8d574]' : 'w-2 bg-gray-800'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: THE SLIDING GALLERY */}
      <div className="w-full lg:w-[55%] relative h-[70vh] lg:h-screen bg-zinc-900 overflow-hidden">
        {gallery.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === currentIndex 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 translate-x-10 scale-105'
            }`}
          >
            <img 
              src={img} 
              alt={`Slide ${index}`} 
              className="w-full h-full object-cover opacity-50 hover:opacity-100  hover:grayscale-0 transition-all duration-700"
            />
          </div>
        ))}
        
        {/* Floating Detail Card (Updates based on slide) */}
        <div className="absolute bottom-12 left-12 bg-black/80 backdrop-blur-md p-6 border border-white/10 hidden md:block animate-float">
           <p className="text-[#e8d574] text-[9px] font-black tracking-[0.3em] uppercase mb-1"></p>
           <p className="text-white font-bold text-lg italic uppercase tracking-tighter">
              {currentIndex === 0 ? "Oversized Tee" : currentIndex === 1 ? "Premium Hoodie" : "Studio Fabric"}
           </p>
           <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-500 text-xs font-bold">
                {currentIndex === 2 ? "Detailing" : ""}
              </span>
              <div className="w-8 h-[1px] bg-[#e8d574]"></div>
           </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent pointer-events-none"></div>
      </div>

      <style jsx>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-fade-in-delay { animation: fadeIn 1s ease-out 0.4s forwards; opacity: 0; }
        .animate-fade-in-delay-2 { animation: fadeIn 1s ease-out 0.7s forwards; opacity: 0; }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default EditorialHero;