import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import the client

const ClothingSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [selectedSize, setSelectedSize] = useState('');

  // LOAD DATA FROM SQL
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  }

  // FILTER LOGIC
  const filteredProducts = products.filter((product) => {
    const priceValue = parseInt(product.price.replace(/[^0-9]/g, ''), 10);
    const matchesCategory = activeCategory === 'All' || 
                            product.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesPrice = priceValue <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  if (loading) return <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center text-[#e8d574]">LOADING COLLECTION...</div>;

  return (
    <section id="clothing" className="bg-[#0a0a0a] py-24 px-6 md:px-20 relative min-h-screen">
      {/* ... (Keep your existing Header and Filter Controls) ... */}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer" onClick={() => { setSelectedProduct(product); setSelectedSize(''); }}>
            <div className="aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="mt-5 flex justify-between uppercase italic">
              <h4 className="text-white font-bold">{product.name}</h4>
              <span className="text-[#e8d574] font-black">{product.price}</span>
            </div>
          </div>
        ))}
      </div>

    {/* MODAL SECTION */}
{selectedProduct && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
    {/* Clickable Overlay to Close */}
    <div 
      className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer" 
      onClick={() => setSelectedProduct(null)}
    ></div>

    <div className="relative w-full max-w-7xl max-h-[95vh] md:max-h-[85vh] bg-[#0d0d0d] border border-white/10 flex flex-col md:flex-row overflow-hidden shadow-2xl animate-modal-up">
      
      {/* CLOSE BUTTON */}
      <button 
        onClick={() => setSelectedProduct(null)} 
        className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors group flex items-center gap-2"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Close</span>
        <span className="text-xl font-light group-hover:rotate-90 transition-transform duration-300">✕</span>
      </button>

      {/* Image Section */}
      <div className="w-full md:w-1/2 h-[35vh] md:h-auto overflow-hidden bg-zinc-900">
        <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
        <p className="text-[#e8d574] font-black tracking-[0.5em] text-[10px] uppercase mb-4">
          {selectedProduct.category}
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase mb-6 leading-none">
          {selectedProduct.name}
        </h2>
        
        <div className="flex items-center gap-4 mb-8">
          <span className="text-3xl font-black text-white italic">{selectedProduct.price}</span>
          <div className="h-[1px] flex-grow bg-white/10"></div>
        </div>

        {/* Size Selector */}
        <div className="bg-white/5 p-6 border border-white/5 mb-8">
          <p className="text-[9px] text-gray-500 uppercase font-black mb-4 tracking-widest">Select Size</p>
          <div className="flex flex-wrap gap-3">
            {selectedProduct.sizes?.map((size) => (
              <button 
                key={size} 
                onClick={() => setSelectedSize(size)}
                className={`min-w-[55px] py-3 border text-[11px] font-bold transition-all ${
                  selectedSize === size 
                  ? 'bg-[#e8d574] text-black border-[#e8d574]' 
                  : 'text-white border-white/20 hover:border-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* WHATSAPP LINK */}
        <a 
          href={selectedSize ? 
            `https://wa.me/919448104211?text=${encodeURIComponent(
              `NEW ORDER INQUIRY\n\n` +
              `Product: ${selectedProduct.name}\n` +
              `Size: ${selectedSize}\n` +
              `Price: ${selectedProduct.price}\n\n` +
              `Link: ${window.location.href}\n` +
              `Image: ${selectedProduct.image}`
            )}` : '#'} 
          target="_blank"
          rel="noreferrer"
          onClick={(e) => !selectedSize && e.preventDefault()}
          className={`block w-full py-5 text-center font-black uppercase tracking-[0.3em] transition-all duration-300 ${
            !selectedSize 
            ? 'bg-zinc-800 text-gray-500 cursor-not-allowed' 
            : 'bg-[#e8d574] text-black hover:bg-white active:scale-95'
          }`}
        >
          {selectedSize ? 'Order via WhatsApp' : 'Select a Size'}
        </a>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default ClothingSection;