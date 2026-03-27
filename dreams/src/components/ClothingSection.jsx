import React, { useState } from 'react';
// Import the separated JSON data
import data from '../products/products.json'; 

const ClothingSection = () => {
  // 1. State for filters
  const [activeCategory, setActiveCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000); // Set a default high value

  // 2. Filter Logic
  const filteredProducts = data.products.filter((product) => {
    // Clean price string (e.g., "₹2,999" -> 2999) to compare numbers
    const priceValue = parseInt(product.price.replace(/[^0-9]/g, ''), 10);
    
    const matchesCategory = activeCategory === 'All' || product.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesPrice = priceValue <= maxPrice;

    return matchesCategory && matchesPrice;
  });

  return (
    <section id='clothing' className="bg-[#0a0a0a] py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-[#e8d574] font-bold tracking-[0.3em] text-xs uppercase mb-4">
              The Apparel Line
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none">
              Wear the <br /> <span className="text-transparent border-text">Vision.</span>
            </h3>
          </div>
          
          {/* 3. Filter Controls UI */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {['All', 'Shirt', 'Pant'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-2 border transition-all ${
                    activeCategory === cat 
                    ? 'bg-yellow-500 border-yellow-500 text-black' 
                    : 'border-white/10 text-gray-500 hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Max Price: ₹{maxPrice}</span>
              <input 
                type="range" 
                min="500" 
                max="5000" 
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="accent-yellow-500 w-32 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Product Grid - Mapping through FILTERED data */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 min-h-[400px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="group relative animate-fade-in">
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                  />
                  
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
                    className="absolute bottom-0 w-full bg-white text-black md:py-3 font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-center"
                  >
                    <div className='flex items-center justify-center gap-2'>
                      <img src="/whatsapp.png" alt="WhatsApp" className='h-5 md:h-6' /> 
                      <span className='text-[10px] md:text-sm uppercase tracking-tighter'>Order on WhatsApp</span>
                    </div>
                  </a>
                </div>

                <div className="mt-3 md:mt-5 flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium text-[14px] md:text-lg group-hover:text-[#e8d574] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-gray-500 text-[9px] md:text-sm mt-1 uppercase tracking-widest">
                      {product.category}
                    </p>
                  </div>
                  <span className="text-white text-[15px] md:text-lg font-bold">{product.price}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 border border-dashed border-white/10">
              <p className="text-gray-500 uppercase tracking-widest text-sm italic">No products match your filter.</p>
              <button onClick={() => {setActiveCategory('All'); setMaxPrice(5000);}} className="mt-4 text-[#e8d574] text-xs font-bold underline">Reset Filters</button>
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div className="mt-24 text-center">
          <button className="group relative inline-flex items-center space-x-4 text-white hover:text-[#e8d574] transition-colors">
       
            <div className="w-12 h-[1px] bg-yellow-500 group-hover:w-20 transition-all"></div>
          </button>
        </div>

      </div>

      <style jsx>{`
        .border-text { -webkit-text-stroke: 1px white; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ClothingSection;