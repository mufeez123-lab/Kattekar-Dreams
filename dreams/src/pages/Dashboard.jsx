import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminUpload = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Shirt');
  const [sizes, setSizes] = useState('S, M, L, XL');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // State to track if we are editing an existing product
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });
    if (!error) setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  // --- DELETE FUNCTION ---
  const handleDelete = async (id, imagePath) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    // 1. Delete from Database
    const { error: dbError } = await supabase.from('products').delete().eq('id', id);
    
    if (dbError) {
      alert("Error deleting product");
    } else {
      // Optional: Delete image from storage if you stored the path correctly
      fetchProducts();
    }
  };

  // --- PREFILL FORM FOR UPDATE ---
  const startEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price.replace(/[^0-9]/g, '')); // Remove ₹ for editing
    setCategory(product.category);
    setSizes(product.sizes.join(', '));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setName(''); setPrice(''); setCategory('Shirt'); setSizes('S, M, L, XL'); setImageFile(null);
  };

  // --- HANDLE SUBMIT (Create OR Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let publicUrl = products.find(p => p.id === editingId)?.image;

      // If a new image is selected, upload it
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, imageFile);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
        publicUrl = data.publicUrl;
      }

      const productData = {
        name,
        price: `₹${price.replace(/[^0-9]/g, '')}`,
        category,
        image: publicUrl,
        sizes: sizes.split(',').map(s => s.trim())
      };

      if (editingId) {
        // UPDATE
        const { error } = await supabase.from('products').update(productData).eq('id', editingId);
        if (error) throw error;
        alert("Product Updated!");
      } else {
        // CREATE
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
        alert("Product Added!");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-black text-white p-6 md:p-10 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-[#e8d574] font-black text-3xl uppercase italic leading-none">
            {editingId ? 'Edit Product' : 'Add Product'}
          </h2>
          {editingId && (
            <button onClick={resetForm} className="text-zinc-500 hover:text-white uppercase text-xs font-bold">
              Cancel Edit
            </button>
          )}
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* --- FORM --- */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="space-y-4 sticky top-10">
              <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} 
                     className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none focus:border-[#e8d574]" required />
              
              <input type="text" placeholder="Price (1499)" value={price} onChange={(e) => setPrice(e.target.value)} 
                     className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none focus:border-[#e8d574]" required />
              
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none">
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Accessory">Accessory</option>
              </select>

              <input type="text" placeholder="Sizes (S, M, L)" value={sizes} onChange={(e) => setSizes(e.target.value)} 
                     className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none" />

              <div className="bg-zinc-900 border border-zinc-800 p-3">
                <label className="block text-zinc-500 text-xs mb-2 uppercase tracking-widest">Product Image</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} 
                       className="w-full text-xs text-zinc-500 file:mr-4 file:py-1 file:px-2 file:border-0 file:bg-zinc-800 file:text-white" 
                       required={!editingId} />
                {editingId && <p className="text-[10px] text-zinc-600 mt-2 italic">Leave empty to keep current image</p>}
              </div>

              <button type="submit" disabled={uploading} className="w-full bg-[#e8d574] text-black font-black py-4 uppercase hover:bg-white transition-colors">
                {uploading ? 'Processing...' : editingId ? 'Update Product' : 'Upload Product'}
              </button>
            </form>
          </div>

          {/* --- INVENTORY LIST --- */}
          <div className="lg:col-span-2">
            <h3 className="text-zinc-500 uppercase text-sm font-bold mb-6 tracking-widest">Current Inventory</h3>
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-zinc-900 border border-zinc-800 p-4 flex items-center gap-4 group">
                  <img src={product.image} alt={product.name} className="w-16 h-20 object-cover bg-zinc-800" />
                  <div className="flex-1">
                    <p className="text-[#e8d574] font-bold uppercase text-sm">{product.name}</p>
                    <p className="text-zinc-500 text-xs">{product.category} • {product.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(product)} className="px-3 py-1 border border-zinc-700 text-[10px] uppercase font-bold hover:bg-white hover:text-black transition-all">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="px-3 py-1 border border-red-900 text-red-500 text-[10px] uppercase font-bold hover:bg-red-600 hover:text-white transition-all">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;