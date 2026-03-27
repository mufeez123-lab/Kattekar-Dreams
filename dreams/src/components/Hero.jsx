import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image / Video Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2070" 
          alt="Cinematography Background" 
          className="h-full w-full object-cover opacity-60 scale-105 animate-slow-zoom"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 lg:px-32 max-w-7xl mx-auto">
        
        {/* Subtle Subtitle */}
        <div className="flex items-center space-x-3 mb-4 animate-fade-in-up">
          <div className="h-[1px] w-12 bg-yellow-500"></div>
          <span className="text-yellow-500 uppercase tracking-[0.4em] text-xs font-bold">
            Based in India
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter uppercase italic animate-fade-in">
          Capturing <br />
          <span className="text-transparent stroke-text">Moments.</span> <br />
          Creating <span className="text-yellow-500">Dreams.</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-lg text-gray-300 text-sm md:text-lg font-light leading-relaxed animate-fade-in-delay">
          Specializing in luxury wedding cinematography and cinematic brand storytelling. 
          We don't just take photos; we document the soul of your most precious memories.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
          <button className="bg-yellow-500 hover:bg-white text-black px-8 py-4 text-sm font-bold tracking-widest transition-all duration-300 transform hover:-translate-y-1">
            ORDER NOW
          </button>
          {/* <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 text-sm font-bold tracking-widest transition-all">
            OUR PROCESS
          </button> */}
        </div>

        {/* Bottom Socials Indicator */}
        <div className="absolute bottom-10 left-6 md:left-20 flex items-center space-x-6">
          <a href="https://www.instagram.com/kattekar_dreams/" target="_blank" className="text-white/50 hover:text-white transition-colors text-xs tracking-widest uppercase">Instagram</a>
          <span className="h-4 w-[1px] bg-white/20"></span>
          <a href="#" className="text-white/50 hover:text-white transition-colors text-xs tracking-widest uppercase">YouTube</a>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 right-10 animate-bounce hidden md:block">
        <div className="w-[1px] h-20 bg-gradient-to-b from-yellow-500 to-transparent mx-auto"></div>
      </div>

      {/* Custom Styles for Stroke Text & Animations */}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px white;
        }
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Hero;