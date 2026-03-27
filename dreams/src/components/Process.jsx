import React from 'react';

const ClothingProcessSection = () => {
  return (
    <section className="bg-black py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Visual Showcase (Clothing Detail) */}
        <div className="w-full lg:w-1/2 relative group">
          <div className="relative aspect-video overflow-hidden rounded-sm">
            {/* Main Lifestyle Shot - Featuring Men */}
            <img 
         src="/images/shopname.png"
              className="w-full h-full  brightness-75 group-hover:brightness-100 transition-all duration-700"
              alt="Kattekar  Men's Lifestyle"
            />
            
            {/* Texture/Detail Inset Image - Featuring Men's apparel detail */}
           
          </div>
        </div>

        {/* Right: Narrative Content (The Brand Story) */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-[#e8d574] font-bold tracking-[0.3em] text-xs uppercase mb-4">
            Quality & Craftsmanship
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic leading-tight mb-6">
            Fabricated for <br /> 
            <span className="text-transparent stroke-text">The Creator.</span>
          </h3>
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
            Kattekar Dreams isn't just a label—it's an extension of our cinematic philosophy. Every piece features heavy-gauge cotton, precision embroidery, and a silhouette designed to move with the modern visionary.
          </p>
          
          {/* Specs/Features */}
          <div className="grid grid-cols-2  border-t border-white/10 pt-8">
         
            <div>
              <h4 className="text-white font-bold text-2xl uppercase italic">Mens</h4>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Oversized Fit</p>
            </div>
            <div>
              <a href="#clothing"> <button 
           
              className="group relative px-5 py-4 bg-[#e8d574] text-black font-black text-[10px] tracking-[0.4em] rounded-[50px] uppercase transition-all hover:bg-white overflow-hidden"
            >
              <span className="relative text-[12px] z-10">Order Now</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button></a>
            </div>
          </div>
          
     
        </div>
      </div>

      <style jsx>{`
        .stroke-text { -webkit-text-stroke: 1px white; }
      `}</style>
    </section>
  );
};

export default ClothingProcessSection;