import React, { useState, useEffect } from 'react';
// Import your initial JSON data
import initialDataJson from '../products/products.json'; 

const ClothingSection = () => {
  // 1. STATE DEFINITIONS
  const [products, setProducts] = useState([]); // This was missing!
  const [activeCategory, setActiveCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [selectedSize, setSelectedSize] = useState('');

  // 2. LOAD DATA (Sync with Dashboard)
  useEffect(() => {
    const saved = localStorage.getItem("myProducts");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(initialDataJson.products);
    }
  }, []); 

  // 3. FILTER LOGIC (Now uses the 'products' state)
  const filteredProducts = products.filter((product) => {
    const priceValue = parseInt(product.price.replace(/[^0-9]/g, ''), 10);
    const matchesCategory = activeCategory === 'All' || 
                            product.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesPrice = priceValue <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  const openDetails = (product) => {
    setSelectedProduct(product);
    setSelectedSize(''); 
  };

  return (
    <section id="clothing" className="bg-[#0a0a0a] py-24 px-6 md:px-20 overflow-hidden relative min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-[#e8d574] font-bold tracking-[0.4em] text-[10px] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#e8d574]/30"></span>
              The Apparel Line
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-[0.85] tracking-tighter">
              Wear the <br /> <span className="text-transparent border-text">Vision.</span>
            </h3>
          </div>
          
          {/* FILTER CONTROLS */}
          <div className="flex flex-col gap-6 p-6 bg-white/5 backdrop-blur-md border border-white/5 rounded-sm">
            <div className="flex items-center gap-3">
              {['All', 'Shirt', 'Pant'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[9px] tracking-[0.3em] uppercase font-black px-5 py-2 transition-all ${
                    activeCategory === cat 
                    ? 'bg-[#e8d574] text-black' 
                    : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {cat}s
                </button>
              ))}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Max Budget</span>
                <span className="text-[11px] text-[#e8d574] font-bold italic">₹{maxPrice}</span>
              </div>
              <input 
                type="range" min="500" max="5000" step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="accent-[#e8d574] w-full h-[2px] bg-zinc-800 appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 min-h-[500px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative cursor-pointer"
                onClick={() => openDetails(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] text-white font-black tracking-[0.4em] uppercase border border-white/20 px-4 py-2 backdrop-blur-md">
                      View Details
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-lg uppercase tracking-tighter italic group-hover:text-[#e8d574] transition-colors">
                      {product.name}
                    </h4>
                  </div>
                  <span className="text-[#e8d574] text-sm md:text-lg font-black italic">{product.price}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-32 border border-dashed border-white/10">
              <p className="text-gray-600 uppercase tracking-[0.5em] text-xs italic">No pieces found in this range.</p>
              <button onClick={() => {setActiveCategory('All'); setMaxPrice(5000);}} className="mt-6 text-[#e8d574] text-[10px] font-black tracking-widest uppercase underline underline-offset-8">Reset Collection</button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL SECTION (Logic remains same) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative w-full max-w-7xl max-h-[95vh] md:max-h-[85vh] bg-[#0d0d0d] border border-white/10 flex flex-col md:flex-row overflow-hidden shadow-2xl animate-modal-up">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-50 text-white/50 hover:text-white">
              <span className="text-[9px] font-black uppercase">Close [X]</span>
            </button>
            <div className="w-full md:w-1/2 h-[35vh] md:h-auto overflow-hidden bg-zinc-900">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <p className="text-[#e8d574] font-black tracking-[0.5em] text-[10px] uppercase mb-4">{selectedProduct.category}</p>
              <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase mb-6">{selectedProduct.name}</h2>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl font-black text-white italic">{selectedProduct.price}</span>
                <div className="h-[1px] flex-grow bg-white/10"></div>
              </div>
              <div className="bg-white/5 p-4 border border-white/5 mb-8">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-3">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes?.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`min-w-[45px] py-2 border text-[11px] font-bold ${selectedSize === size ? 'bg-[#e8d574] text-black border-[#e8d574]' : 'text-white border-white/20'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
         <a 
  href={selectedSize ? 
    `https://wa.me/919448104211?text=${encodeURIComponent(
      `NEW ORDER INQUIRY\n\n` +
      `Product: ${selectedProduct.name}\n` +
      `Size: ${selectedSize}\n` +
      `Price: ${selectedProduct.price}\n\n` +
      // Only add the image link if it's NOT a Base64 string
      (selectedProduct.image.startsWith('data:') 
        ? "[Image Uploaded via Admin]" 
        : `Image: https://kattekar-dreams.vercel.app${selectedProduct.image.startsWith('/') ? '' : '/'}${selectedProduct.image}`)
    )}` 
    : '#'} 
  target={selectedSize ? "_blank" : "_self"}
  rel="noreferrer" 
  onClick={(e) => !selectedSize && e.preventDefault()}
  className={`block w-full py-4 text-center font-black uppercase tracking-widest transition-all duration-300 ${
    !selectedSize 
      ? 'bg-zinc-800 text-gray-500 cursor-not-allowed' 
      : 'bg-[#e8d574] text-black hover:scale-[1.01] active:scale-95'
  }`}
>
  {selectedSize ? 'Order via WhatsApp' : 'Select a Size'}
</a>
            </div>
          </div>
        </div>
      )}

      {/* FIXED CSS BLOCK */}
      <style>{`
        .border-text { -webkit-text-stroke: 1px rgba(255,255,255,0.5); }
        .animate-modal-up { animation: modalUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes modalUp {
          from { opacity: 0; transform: scale(0.95) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px; width: 12px;
          border-radius: 50%; background: #e8d574;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default ClothingSection;