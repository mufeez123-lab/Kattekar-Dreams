import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminUpload = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Shirt');
  const [sizes, setSizes] = useState('S, M, L, XL'); // Comma separated
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image!");

    setUploading(true);

    try {
      // 1. Upload Image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 2. Get the Public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      // 3. Insert Product Data into SQL Table
      const { error: dbError } = await supabase
        .from('products')
        .insert([
          {
            name,
            price: `₹${price.replace(/[^0-9]/g, '')}`, // Ensures ₹ format
            category,
            image: publicUrl, // The real URL for WhatsApp!
            sizes: sizes.split(',').map(s => s.trim()) // Converts string to Array
          }
        ]);

      if (dbError) throw dbError;

      alert("Product Added Successfully!");
      // Reset form
      setName(''); setPrice(''); setImageFile(null);
      
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-black text-white p-10 min-h-screen">
      <h2 className="text-[#e8d574] font-black text-3xl uppercase italic mb-8">Add New Product</h2>
      
      <form onSubmit={handleUpload} className="max-w-md space-y-4">
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} 
               className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none focus:border-[#e8d574]" required />
        
        <input type="text" placeholder="Price (e.g. 1499)" value={price} onChange={(e) => setPrice(e.target.value)} 
               className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none focus:border-[#e8d574]" required />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-3">
          <option value="Shirt">Shirt</option>
          <option value="Pant">Pant</option>
          <option value="Accessory">Accessory</option>
        </select>

        <input type="text" placeholder="Sizes (S, M, L)" value={sizes} onChange={(e) => setSizes(e.target.value)} 
               className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none" />

        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} 
               className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-zinc-800 file:text-white" required />

        <button type="submit" disabled={uploading} className="w-full bg-[#e8d574] text-black font-black py-4 uppercase hover:bg-white transition-colors">
          {uploading ? 'Processing...' : 'Upload Product'}
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;