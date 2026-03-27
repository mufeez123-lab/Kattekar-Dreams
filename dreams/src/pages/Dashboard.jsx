import React, { useState, useEffect } from 'react';
import initialDataJson from '../products/products.json';

const Dashboard = () => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("myProducts");
    return saved ? JSON.parse(saved) : initialDataJson.products;
  });

  // Updated state to include image string
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Shirt', image: '' });

  useEffect(() => {
    localStorage.setItem("myProducts", JSON.stringify(products));
  }, [products]);

  // Handle image file conversion to Base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: formData.name,
      price: `₹${formData.price}`,
      category: formData.category,
      // Use the uploaded image, or a fallback placeholder if empty
      image: formData.image || "/images/placeholder.webp", 
      sizes: ["S", "M", "L", "XL"]
    };

    setProducts([newProduct, ...products]);
    setFormData({ name: '', price: '', category: 'Shirt', image: '' });
    // Reset file input manually
    e.target.reset();
  };

  const deleteProduct = (id) => {
    if(window.confirm("Delete this product?")) {
        setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Product</h2>
          <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="Price (numbers only)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-black"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
            </select>
            
            {/* NEW IMAGE INPUT */}
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
            />

            <button
              type="submit"
              className="md:col-span-2 lg:col-span-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all font-bold uppercase tracking-widest"
            >
              Upload Product
            </button>
          </form>
        </div>

        {/* TABLE VIEW */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-[10px] tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <img src={product.image} alt="thumb" className="w-12 h-12 object-cover rounded border border-gray-200" />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{product.category}</td>
                  <td className="px-6 py-4 text-gray-900 font-bold">{product.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-tighter"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;