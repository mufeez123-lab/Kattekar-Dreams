import React from 'react';

const ProcessSection = () => {
  return (
    <section className="bg-black py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Visual Showcase */}
        <div className="w-full lg:w-1/2 relative group">
          <div className="relative aspect-video overflow-hidden rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
              alt="Final Work"
            />
            {/* BTS Inset Image */}
            <div className="absolute -bottom-6 -right-6 w-1/2 aspect-video border-4 border-black overflow-hidden shadow-2xl">
               <img 
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1887&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Behind the scenes"
              />
              <div className="absolute inset-0 bg-yellow-500/20 mix-blend-multiply"></div>
            </div>
          </div>
        </div>

        {/* Right: Narrative Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-yellow-500 font-bold tracking-[0.3em] text-xs uppercase mb-4">
            Our Philosophy
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic leading-tight mb-6">
            More Than Just <br /> 
            <span className="text-transparent stroke-text">A Snapshot.</span>
          </h3>
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
            We believe every frame should feel like a movie. From the initial storyboard to the final color grade, we meticulously craft each visual to evoke emotion. 
          </p>
          
          {/* Stats/Features */}
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div>
              <h4 className="text-white font-bold text-2xl uppercase italic">4K RAW</h4>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Production Quality</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-2xl uppercase italic">Custom</h4>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Color Grading</p>
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

export default ProcessSection;