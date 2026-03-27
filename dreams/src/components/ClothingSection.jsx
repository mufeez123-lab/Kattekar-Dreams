import React from 'react';
// Import the separated JSON data
import data from '../products/products.json'; 

const ClothingSection = () => {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-yellow-500 font-bold tracking-[0.3em] text-xs uppercase mb-4">
              The Apparel Line
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none">
              Wear the <br /> <span className="text-transparent border-text">Vision.</span>
            </h3>
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            Minimalist streetwear designed for the creators, the dreamers, and the visual storytellers.
          </p>
        </div>

        {/* Product Grid - Mapping through imported data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {data.products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover  group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                />
                
                <div className="absolute top-4 left-4 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 tracking-widest uppercase">
                  {product.tag}
                </div>

       <a
  href={`https://wa.me/916362514956?text=${encodeURIComponent(
    `Hello, I want to order:\n\n` +
    `*Product:* ${product.name}\n` +
    `*Price:* ${product.price}\n` +
    `*Category:* ${product.category}\n\n` +
    `*View Product:* ${window.location.origin}${product.image}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="absolute bottom-0 w-full bg-white text-black py-2 font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-center"
>
  <div className='flex items-center justify-center gap-2'>
    <img src="/whatsapp.png" alt="WhatsApp" className='h-8' /> 
    <span>Order on WhatsApp</span>
  </div>
</a>
              </div>

              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium text-lg group-hover:text-yellow-500 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">
                    {product.category}
                  </p>
                </div>
                <span className="text-white font-bold">{product.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-16 text-center">
          <button className="group relative inline-flex items-center space-x-4 text-white hover:text-yellow-500 transition-colors">
            <span className="text-sm font-bold tracking-[0.2em] uppercase">Browse Full Collection</span>
            <div className="w-12 h-[1px] bg-yellow-500 group-hover:w-20 transition-all"></div>
          </button>
        </div>

      </div>

      <style jsx>{`
        .border-text { -webkit-text-stroke: 1px white; }
      `}</style>
    </section>
  );
};

export default ClothingSection;